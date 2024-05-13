import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SYSTEM_URL, formatDate } from "../../global";
import Loading from "../loading";
import NavBar from "../navbar";
import axios from "axios";

function CompletedOrdersPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const itemsPerPage = 15;

  const [totalDinar, setTotalDinar] = useState(0);
  const [totalDollar, setTotalDollar] = useState(0);

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function loadData(page = 1) {
    setLoading(true);
    await fetch(SYSTEM_URL + `completed_orders/?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === "token_not_valid") {
          navigate("/login", { replace: true });
        }

        setData(data);
        setPaginatedData(data.results);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    setLoading(true);
    loadData();
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    setLoading(false);
  }, []);

  const totalPages = Math.ceil(data.count / itemsPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      loadData(page);

      setCurrentPage(page);
    }
  };

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate("/container_details", {
        state: {
          id: row.id,
          name: row.name,
          total_dinar: row.total_dinar,
          total_dollar: row.total_dollar,
        },
      });
    },
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>
          {data.count} {data.count > 1 ? "Orders" : "Order"}
        </p>
      </div>
      <div className="container-fluid">
        <button className="btn btn-primary m-1" onClick={() => changePage(1)}>
          &laquo; First
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => changePage(currentPage - 1)}
        >
          &lsaquo; Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-primary m-1"
          onClick={() => changePage(currentPage + 1)}
        >
          Next &rsaquo;
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => changePage(totalPages)}
        >
          Last &raquo;
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="container-fluid"
          style={{ margin: "0px", padding: "0px" }}
        >
          <div
            className="container-fluid text-center"
            style={{
              overflowX: "auto",
              width: "100%",
              fontSize: "14px",
            }}
          >
            <div className="container-fluid " style={{ overflowX: "auto" }}>
              <table className="table table-striped table-sm table-hover">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Created At </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item.vendor_id + Math.random() * 10}>
                      <td>{item.order_id}</td>
                      <td>{item.client_name}</td>
                      <td>
                        {item?.status?.biker_status === null
                          ? "قيد الشحن"
                          : item?.status?.arrived_status
                          ? "تم التوصيل"
                          : item?.status?.biker_status?.title === "accepted"
                          ? "تم قبول الطلب"
                          : "مرفوض"}
                      </td>
                      <td>
                        {new Date(item.created_at).toISOString().slice(0, 10)}
                      </td>

                      <td>
                        <button
                          className="btn btn-light text-primary"
                          onClick={() => {
                            navigate("/order_details", { state: item });
                          }}
                        >
                          <b>Details</b>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CompletedOrdersPage;
