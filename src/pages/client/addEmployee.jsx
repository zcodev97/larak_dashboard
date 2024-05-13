import { useState, React, useEffect } from "react";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { Larak_System_URL } from "../../globals";
import NavBar from "../../components/navbar";

function AddEmployeePage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser() {
    setLoading(true);
    await fetch(Larak_System_URL + "add_employee/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        username: phone,
        password: password,
        user_type: "fb31097c-ad41-4336-8976-7a1e0716e3ac",
        supervisor: localStorage.getItem("username_id"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.detail) {
          alert(data.detail);
          return;
        }
        if (data.password) {
          alert(data.password);
          return;
        }

        console.log(data);

        navigate("/employees_list", { replace: true });
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) return <Loading />;

  return (
    <>
      <NavBar />
      <form
        style={{
          height: window.innerHeight - 85,
          overflowY: "auto",
          display: "grid",
          alignItems: "center",
        }}
      >
        <div className="container p-4     text-center text-dark">
          <div
            className="container pt-4 pb-4 mb-4 rounded-circle"
            style={{ color: "#ff8000", fontSize: "30px" }}
          >
            <b> تسجيل موظف جديد </b>
          </div>

          <div className="container-fluid">
            <input
              maxLength={11}
              type="tel"
              className="form-control text-center"
              style={{
                backgroundColor: "#e6e6e6",
                fontSize: "20px",
                padding: "20px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
              id="phone"
              placeholder=" رقم الهاتف"
              name="phone"
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>

          <div className="container-fluid">
            <input
              type="password"
              className="form-control text-center"
              style={{
                backgroundColor: "#e6e6e6",
                fontSize: "20px",
                padding: "20px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
              id="pwd"
              placeholder="كلمة السر"
              name="pswd"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <button
            className="btn p-4"
            style={{ color: "#ff8000", fontSize: "20px" }}
            onClick={() => {
              if (phone.length !== 11) {
                alert("phone number must be 11 numbers");
                return;
              }
              registerUser();
            }}
            onKeyDown={() => {
              if (phone.length !== 11) {
                alert("phone number must be 11 numbers");
                return;
              }
              registerUser();
            }}
          >
            <b style={{ fontWeight: "bold" }}> تسجيل</b>
          </button>
          <br />
        </div>
      </form>
    </>
  );
}

export default AddEmployeePage;
