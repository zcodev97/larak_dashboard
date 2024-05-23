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
  return (
    <>
      <NavBar />
      <iframe
        width="100%"
        height={window.document.body.scrollHeight}
        // width={window.innerWidth}
        // height={window.innerHeight}
        src="http://a.larak.com.iq:8001/admin/"
        title="Larak"
      ></iframe>
    </>
  );
}
export default ControlPanelPage;
