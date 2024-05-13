import { useEffect, useState } from "react";
import { SYSTEM_URL, formatDate } from "../../global";
import NavBar from "../navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import Select from "react-select";
import Loading from "../loading";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import * as XLSX from "xlsx";
import swal from "sweetalert";

function ControlPanelPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalToBePaid, setTotalTobePaid] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Filtered data for the table

  const exportToPDF = () => {
    // Save the current document title
    const originalTitle = document.title;

    // Set the document title to the custom title
    document.title = ` حسابات مطاعم   -  ${formatDate(
      startDate
    )} - ${formatDate(endDate)}.pdf`;
    window.print();

    window.addEventListener("afterprint", () => {
      document.title = originalTitle;
    });
  };

  //convert json to excel
  const JSONToExcel = (jsonData, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  // const rowEvents = {
  //   onClick: (e, row, rowIndex) => {
  //     navigate("/payment_details", {
  //       state: {
  //         row: row,
  //         data: data,
  //         startDate: startDate,
  //         endDate: endDate,
  //       },
  //     });
  //   },
  // };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({});
  const [paymentMethodDropDown, setpaymentMethodDropDown] = useState([]);
  let dropdownMenupaymentmethodTemp = [];
  async function loadPaymentsMethod() {
    setLoading(true);

    fetch(SYSTEM_URL + "payment_methods/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.code === "token_not_valid") {
          navigate("/login", { replace: true });
        }
        response.results?.forEach((i) => {
          dropdownMenupaymentmethodTemp.push({
            label: i.title,
            value: i.id,
          });
        });
        setpaymentMethodDropDown(dropdownMenupaymentmethodTemp);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const [selectedPaymentCycle, setSelectedPaymentCycle] = useState({});
  const [paymentCycleDropDown, setpaymentCycleDropDown] = useState([]);
  let dropdownMenupaymentcyclesTemp = [];
  async function loadPaymentsCycle() {
    setLoading(true);

    fetch(SYSTEM_URL + "payment_cycles/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        response.results?.forEach((i) => {
          dropdownMenupaymentcyclesTemp.push({
            label: i.title,
            value: i.id,
          });
        });
        setpaymentCycleDropDown(dropdownMenupaymentcyclesTemp);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const [selectedVendor, setSelectedVendor] = useState({});
  const [vendorsDropDownMenu, setVendorsDropDownMenu] = useState([]);
  let dropdownMenuVendorsTemp = [];

  async function payVendors() {
    setLoading(true);

    // console.log(filteredData);

    try {
      const response = await fetch(SYSTEM_URL + "create_payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(filteredData.length !== 0 ? filteredData : data),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Data saved successfully");
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

    setLoading(false);

    navigate("/paid_vendors", { replace: true });
  }

  async function paySingleVendor(data) {
    setLoading(true);

    // console.log(filteredData);

    try {
      const response = await fetch(SYSTEM_URL + "create_payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify([data]),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Data saved successfully");
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

    setLoading(false);

    // navigate("/paid_vendors", { replace: true });
  }

  async function loadPaymentForGivenDate() {
    setLoading(true);
    setFilteredData([]);
    setData([]);
    setSelectedPaymentCycle("");
    setSelectedVendor("");
    setSelectedPaymentMethod("");
    await fetch(
      SYSTEM_URL +
        `vendor-payments-summary/?start_date=${formatDate(
          startDate
        )}&end_date=${formatDate(endDate)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.code === "token_not_valid") {
          navigate("/login", { replace: true });
        }

        data = data.filter((i) => i.orders.length > 0);
        if (data.length > 0) {
          setTotalTobePaid(
            data.reduce(
              (accumulator, currentObject) =>
                accumulator + parseFloat(currentObject.to_be_paid),
              0
            )
          );
          setTotalOrders(
            data.reduce(
              (accumulator, currentObject) =>
                accumulator + parseFloat(currentObject.order_count),
              0
            )
          );

          setTotalVendors(data.length);

          data.map((i) => {
            // i.to_be_paid = i.to_be_paid.toLocaleString("en-US", {
            //   style: "currency",
            //   currency: "IQD",
            //   minimumFractionDigits: 0,
            //   maximumFractionDigits: 2,
            // });
            i.to_be_paid = parseFloat(i.to_be_paid);
            i.is_paid = i.is_paid ? true : false;
            i.created_by = localStorage.getItem("user_id");

            dropdownMenuVendorsTemp.push({
              label: i.vendor,
              value: i.vendor_id,
            });
          });

          setVendorsDropDownMenu(dropdownMenuVendorsTemp);

          setData(data);
          setFilteredData(data);
        } else {
          alert("No Orders Found With Given Period");
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    // loadPaymentsMethod();
    // loadPaymentsCycle();

    if (location?.state?.data.length > 0) {
      setLoading(true);
      setData(location?.state?.data);
      setStartDate(location?.state?.start_date);
      setEndDate(location?.state?.end_date);
      setTotalTobePaid(
        location?.state?.data.reduce(
          (accumulator, currentObject) =>
            accumulator + parseFloat(currentObject.to_be_paid),
          0
        )
      );
      setTotalOrders(
        location?.state?.data.reduce(
          (accumulator, currentObject) =>
            accumulator + parseFloat(currentObject.order_count),
          0
        )
      );
      setLoading(false);
    }
  }, []);

  return (
    <>
      <NavBar />
      <iframe
        width="100%"
        height={window.document.body.scrollHeight}
        // width={window.innerWidth}
        // height={window.innerHeight}
        src="http://localhost:8000/admin/"
        title="Larak"
      ></iframe>
    </>
  );
}
export default ControlPanelPage;
