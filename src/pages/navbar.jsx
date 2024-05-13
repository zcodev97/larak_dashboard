import { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import Loading from "./loading";
// db password Qymbg5QhNbAzRn!
import "@flaticon/flaticon-uicons/css/all/all.css";
function NavBar() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    localStorage.clear();

    setLoading(false);
    navigate("/login", { replace: true });
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-sm  text-center border-bottom rounded mb-2"
        id="no-print"
      >
        <div
          className="container-fluid"
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "end",
            margin: "0px",
            padding: "0px",
          }}
        >
          {/* Start of the main navbar content */}
          <div className="contaier-fluid">
            <button
              className="navbar-toggler bg-dark text-end"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" style={{ fontSize: "16px" }}>
              {/* <li className="nav-item rounded m-1">
                <Link
                  onClick={() => handleLinkClick("vendors")}
                  className={`${navLinkClassName} ${
                    activeLink === "vendors" ? "active-link" : ""
                  }`}
                  to="/vendors"
                  style={{ fontSize: "20px", color: "red" }}
                >
                  <i className="fi fi-rs-bells"></i>
                </Link>
              </li> */}
              <li className="nav-item rounded m-1">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? "active-link" : "")
                  }
                  to="/current_orders"
                >
                  <b>Current Orders</b>
                </NavLink>
              </li>
              <li className="nav-item rounded m-1">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? "active-link" : "")
                  }
                  to="/orders"
                >
                  <b>Orders</b>
                </NavLink>
              </li>

              <li className="nav-item rounded m-1">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? "active-link" : "")
                  }
                  to="/system-users"
                >
                  <b>System Users</b>
                </NavLink>
              </li>
              <li className="nav-item rounded m-1">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? "active-link" : "")
                  }
                  to="/bikers"
                >
                  <b>Bikers</b>
                </NavLink>
              </li>

              <li className="nav-item rounded m-1">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? "active-link" : "")
                  }
                  to="/users-managers"
                >
                  <b>Managers (Clients)</b>
                </NavLink>
              </li>

              <li className="nav-item rounded m-1">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? "active-link" : "")
                  }
                  to="/users-under-managers"
                >
                  <b>Managers Employees</b>
                </NavLink>
              </li>

              <li className="nav-item rounded m-1">
                <NavLink
                  style={{ textDecoration: "none" }}
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? "active-link" : "")
                  }
                  to="/control_panel"
                >
                  <b>Other</b>
                </NavLink>
              </li>

              <li className="nav-item btn m-1 p-2 ">
                <b className="text-light">{localStorage.getItem("username")}</b>
              </li>
              <li className="nav-item rounded m-1">
                <Link
                  className="nav-link text-light bg-danger rounded p-2 border border-3 border-danger"
                  to="/login"
                  onClick={handleLogout}
                >
                  <b>Sign Out</b>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default NavBar;
