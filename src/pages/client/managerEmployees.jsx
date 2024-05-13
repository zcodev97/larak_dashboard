import { useEffect, useState } from "react";
import NavBar from "../../components/navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FormatDateTime, Larak_System_URL } from "../../globals";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
function ManagerEmployeesPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  async function loadData() {
    setLoading(true);

    await fetch(Larak_System_URL + "users_under_managers/", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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

        data.map((i) => {
          i.date_joined = FormatDateTime(i.date_joined);
        });

        setData(data);
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const columns = [
    {
      dataField: "username",
      text: "اسم المستخدم",
      sort: true,
      filter: textFilter(),
    },
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      navigate("/update_employee_password", {
        state: {
          id: row.id,
          username: row.username,
          date_joined: row.date_joined,
        },
      });
    },
  };

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        "loading"
      ) : (
        <div
          className="container-fluid text-center"
          style={{
            height: window.innerHeight - 85,
            overflowY: "auto",

            fontSize: "16px",
            color: "#ff8000",
            fontWeight: "bold",
          }}
        >
          <p
            className="p-3 "
            style={{
              fontSize: "20px",
              color: "#ff8000",
              fontWeight: "bold",
            }}
          >
            <b> الموظفين </b>
          </p>

          <BootstrapTable
            hover={true}
            bordered={false}
            bootstrap4
            keyField="id"
            columns={columns}
            data={data}
            pagination={pagination}
            filter={filterFactory()}
            rowEvents={rowEvents}
          />
          <div className="container">
            <div
              className="btn border rounded"
              style={{
                fontSize: "20px",
                color: "#ff8000",
              }}
              onClick={() => {
                navigate("/add_employee");
              }}
            >
              اضافة موظف
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManagerEmployeesPage;
