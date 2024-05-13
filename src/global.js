function formatDate(date = new Date()) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function FormatDateTime(date) {
  date = new Date(date);
  // Extract date components
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hours = date.getHours();
  let minutes = ("0" + date.getMinutes()).slice(-2);

  // Determine AM or PM suffix based on the hour
  let suffix = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour time
  hours = hours % 12 || 12;
  hours = ("0" + hours).slice(-2); // pad with zero

  return `${year}-${month}-${day} ${hours}:${minutes} ${suffix}`;
}

// const SYSTEM_URL = "http://38.180.105.203:8010/";
// const SYSTEM_URL = "http://localhost:8000/";
const SYSTEM_URL = "http://a.larak.com.iq:8001/";

export { formatDate, SYSTEM_URL, FormatDateTime };
