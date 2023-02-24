const months = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
export const formatDate = (
  d,
  returnMonth,
  returnDay,
  returnYear,
  fullMonth
) => {
  var mm = new Date(d).getMonth() + 1; // getMonth() is zero-based
  var dd = new Date(d).getDate();
  if (fullMonth) {
    let tempDate = returnMonth ? months[(mm > 9 ? "" : "0") + mm] + " " : "";
    tempDate += returnDay
      ? (dd > 9 ? "" : "0") + dd + (returnYear ? ", " : "")
      : "";
    tempDate += returnYear ? new Date(d).getFullYear() : "";
    return tempDate;
  }
  let tempDate = returnMonth ? (mm > 9 ? "" : "0") + mm + "/" : "";
  tempDate += returnDay
    ? (dd > 9 ? "" : "0") + dd + (returnYear ? "/" : "")
    : "";
  tempDate += returnYear ? new Date(d).getFullYear() : "";
  return tempDate;
};
export const subtractDays = (d, days) => {
  const date = new Date(d);
  date.setDate(date.getDate() - days);
  return date;
};
export const subtractYears = (d, years) => {
  const date = new Date(d);
  date.setFullYear(date.getFullYear() - years);
  return date;
};
export const subtractMonths = (d, months) => {
  const date = new Date(d);
  date.setMonth(date.getMonth() - months);
  return date;
};
export const getNextSunday = (day, weekday) => {
  const date = new Date(day);
  const current = new Date(date).getDay();
  const days = (7 + weekday - current) % 7;
  return date.setDate(date.getDate() + days);
};
