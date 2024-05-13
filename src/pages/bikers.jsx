import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import NavBar from "../components/navbar";
import { FormatDateTime, Larak_System_URL } from "../globals";

function BikersPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  var fields = [
    {
      dataField: "username",
      text: "Username",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "first_name",
      text: "First Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "phone",
      text: "Phone Number",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "user_type",
      text: "User Type",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "supervisor",
      text: "Supervisor",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "date_joined",
      text: "Date Joined",
      sort: true,
      filter: textFilter(),
    },
  ];
  const [data, setData] = useState([]);

  async function getAllUsers() {
    setLoading(true);
    var token = localStorage.getItem("token");

    fetch(Larak_System_URL + "bikers/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.detail) {
          alert(response.detail);
          setLoading(false);
        }

        response.map((i) => (i.date_joined = FormatDateTime(i.date_joined)));

        setData(response);
      });

    setLoading(false);
  }

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 15,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  useEffect(() => {
    setLoading(true);

    var token = localStorage.getItem("token");

    if (token === "" || token === null || token === undefined) {
      navigate("/login", { replace: true });
      setLoading(false);

      return;
    }

    getAllUsers();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <div className="container p-2 mt-2   border-2 border-bottom border-primary text-dark rounded">
        <h3 className="text-center">
          <b> Users </b>
        </h3>
      </div>
      <div className="container-fluid bg-light rounded p-1 text-center">
        <BootstrapTable
          hover={true}
          bordered={false}
          keyField="id"
          columns={fields}
          data={data}
          pagination={pagination}
          filter={filterFactory()}
          wrapperClasses="table-responsive"
        />
      </div>
    </>
  );
}

export default BikersPage;
