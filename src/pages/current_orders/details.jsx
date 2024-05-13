import { useEffect, useState } from "react";
import { SYSTEM_URL, formatDate, FormatDateTime } from "../../global";
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

function CurrentOrderDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [vendorName, setVendorName] = useState("");
  const [number, setNumber] = useState("");
  const [receiverName, setPaymentReceiverName] = useState("");
  const [phoneNumber, setOwnerPhoneNumber] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const [selectedBiker, setSelectedBiker] = useState({});
  const [bikersDropDownMenu, setBikersDropDownMenu] = useState([]);
  let bikersTempDropDownMenu = [];
  async function loadBikersDropDownMenu() {
    setLoading(true);

    fetch(SYSTEM_URL + "bikers/", {
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
        response.forEach((i) => {
          bikersTempDropDownMenu.push({
            label: i.first_name + " " + i.username,
            value: i.username,
          });
        });
        setBikersDropDownMenu(bikersTempDropDownMenu);
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function updateOrder(title) {
    setLoading(true);

    let status = location.state.status;
    status.vendor_status = {
      title: title,
      created_at: new Date(),
    };

    status.biker_status = {
      biker: selectedBiker.value,
      title: title,
      created_at: new Date(),
    };

    let dataTosend = JSON.stringify({
      status: status,
    });

    await fetch(SYSTEM_URL + "update_order/" + location.state.id, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: dataTosend,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detail === "Given token not valid for any token type") {
          navigate("/login", { replace: true });
          return;
        }
        if (data.detail) {
          alert(data.detail);
          return;
        }
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
    window.cart = undefined;
    setLoading(false);
    navigate("/orders", { replace: true });
  }

  useEffect(() => {
    loadBikersDropDownMenu();
  }, []);

  return (
    <>
      <NavBar />

      {loading ? (
        <Loading />
      ) : (
        <div>
          <div
            className="container text-center p-2 "
            style={{ fontSize: "20px" }}
          >
            <p style={{ fontWeight: "bold" }}>{location.state.order_id} </p>
            <p style={{ fontWeight: "bold" }}>{location.state.client_name} </p>
            <p style={{ fontWeight: "bold" }}>
              {FormatDateTime(location.state.created_at)}
            </p>

            <p>
              {location.state.cart
                .map((i) => i.price * i.amount)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "IQD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
            </p>
          </div>

          <table className="table text-center">
            <thead>
              <tr>
                <th>Product</th>
                <th>Amount</th>
                <th>Category </th>
                <th>Price </th>
                <th>Discount </th>
              </tr>
            </thead>
            <tbody>
              {location.state.cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.amount}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "IQD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>{item.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* select biker */}

          <div className="container-fluid" style={{ overflowX: "auto" }}>
            <div className="container-fluid mt-4 mb-4 text-start">
              <div
                style={{
                  width: "300px",
                }}
              >
                Search By Vendor
                <Select
                  defaultValue={selectedBiker}
                  options={bikersDropDownMenu}
                  onChange={(opt) => {
                    setSelectedBiker(opt);
                  }}
                  value={selectedBiker}
                />
              </div>
            </div>

            <button
              className="btn btn-success text-light"
              onClick={() => {
                updateOrder("accepted");
              }}
            >
              <b>Accept</b>
            </button>
            <hr />

            <button
              className="btn btn-danger text-light"
              onClick={() => {
                updateOrder("rejected");
              }}
            >
              <b>Reject</b>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default CurrentOrderDetailsPage;
