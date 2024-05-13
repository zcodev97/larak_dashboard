import NoPage from "./pages/NoPage";
import LoginPage from "./pages/login";
import CurrentOrdersPage from "./pages/current_orders/records";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import PaymentsPage from "./pages/control_panel/records";
import OrdersPage from "./pages/orders/records";
import OrderDetailsPage from "./pages/orders/details";
import CurrentOrderDetailsPage from "./pages/current_orders/details";
import ControlPanelPage from "./pages/control_panel/records";
import CompletedOrdersPage from "./pages/orders/invocies";
import UsersUnderManagersPage from "./pages/managers_employees/records";
import ManagersPage from "./pages/managers_users/records";
import BikersPage from "./pages/bikers/records";
import SystemUsersPage from "./pages/system_users/records";
const frameguard = require("frameguard");

function App() {
  return (
    <div className="App">
      <div className="container-fluid bg-white" style={{ height: "100vh" }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                localStorage.getItem("token") === null ||
                localStorage.getItem("token") === undefined ? (
                  <LoginPage />
                ) : (
                  <CurrentOrdersPage />
                )
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/current_orders" element={<CurrentOrdersPage />} />

            <Route path="/system-users" element={<SystemUsersPage />} />
            <Route path="/bikers" element={<BikersPage />} />
            <Route path="/users-managers" element={<ManagersPage />} />
            <Route
              path="/users-under-managers"
              element={<UsersUnderManagersPage />}
            />

            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/order_details" element={<OrderDetailsPage />} />
            <Route
              path="/current_order_details"
              element={<CurrentOrderDetailsPage />}
            />

            <Route path="/completed_orders" element={<CompletedOrdersPage />} />
            <Route path="/control_panel" element={<ControlPanelPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
