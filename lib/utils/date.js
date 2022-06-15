export const convertMonth = (month, type = "default") => {
  let names = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let namesShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return type === "default" ? names[month - 1] : namesShort[month - 1];
};
