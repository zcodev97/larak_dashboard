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

function OrderDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [vendorName, setVendorName] = useState("");
  const [number, setNumber] = useState("");
  const [receiverName, setPaymentReceiverName] = useState("");
  const [phoneNumber, setOwnerPhoneNumber] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

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
            <p>
              {location.state.status.biker_status === null
                ? "قيد الشحن"
                : location.state.status.biker_status.title === "delivered"
                ? "تم التوصيل"
                : "مرفوض"}
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

          <div className="container-fluid" style={{ overflowX: "auto" }}></div>
        </div>
      )}
    </>
  );
}
export default OrderDetailsPage;
