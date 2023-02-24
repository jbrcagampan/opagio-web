export const formatDate = (d, returnMonth, returnDay, returnYear) => {
  var mm = new Date(d).getMonth() + 1; // getMonth() is zero-based
  var dd = new Date(d).getDate();
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
