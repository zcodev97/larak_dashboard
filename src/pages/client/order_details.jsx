import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import { FormatDateTime } from "../../globals";

function OrderDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);

  let x = location.state.cart?.map((i) => i.price * i.amount);

  let totalPrice = x.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <>
      <NavBar />
      <div className="container">
        <div
          className="container text-center d-flex justify-content-center align-items-center"
          style={{ fontSize: "20px", margin: "5px", padding: "5px" }}
        >
          <b className="p-2">{location.state.order_id}</b>

          <b className="p-2"> رقم الطلب</b>
        </div>

        <table
          className="table table-sm text-center rounded"
          style={{ fontSize: "16px", fontWeight: "normal" }}
        >
          <thead></thead>
          <tbody>
            {location.state.cart?.map((i) => (
              <tr
                className="text-center"
                style={{
                  borderTop: "0px",
                  borderRadius: "10px",
                  boxShadow: "4px 4px 4px  #e6e6e6",
                  margin: "5px",
                }}
              >
                <td className="text-end">
                  <div className="container-fluid d-flex justify-content-end align-items-center">
                    <p className="p-2">
                      {i.title}
                      <p>
                        {(i.price * i.amount).toLocaleString("en-US", {
                          style: "currency",
                          currency: "IQD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p>{i.amount}</p>
                    </p>

                    <img
                      className="rounded-circle"
                      src={i.image}
                      width={75}
                      alt=""
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="container text-center d-flex justify-content-center align-items-center"
          style={{ fontSize: "20px" }}
        >
          <p className="pr-2">
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "IQD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>المبلغ الكلي</p>
        </div>
        <div
          className="container text-center d-flex justify-content-center align-items-center"
          style={{ fontSize: "20px" }}
        >
          <p className="pr-2">{FormatDateTime(location.state.created_at)}</p>
          <p>تاريخ الطلب</p>
        </div>
        <div
          className="container text-center d-flex justify-content-center align-items-center"
          style={{ fontSize: "20px" }}
        >
          <p className="pr-2">
            {location.state.status[0]?.manager_status !== undefined
              ? location.state?.status[0]?.manager_status.accept
              : location.state?.status[0]?.vendor_status.accept}
          </p>
          <p> حالة الطلب</p>
        </div>
      </div>
    </>
  );
}

export default OrderDetailsPage;
