// media query constants

export const SCREEN_WIDTH = window.innerWidth < 768;
export const LOGO_WIDTH = window.innerWidth < 1024;

//  pagination document fetch limit
export const LIMIT = 10;

export const modalStyle = {
  maxWidth: "600px",
  // maxHeight: "300px",
  width: "90%",
  borderRadius: "2px",
  position: "relative",
  animation: "fadeInScale 0.3s ease",
};

export const fetchUserData = () => {
  const user = JSON.parse(localStorage.getItem("userData")) || null;
  return user;
};

export const userId = JSON.parse(localStorage.getItem("userData"))?._id;

export const MONTH_NAMES = [
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

export const TV = window.innerWidth > 1580;
export const DESKTOP = window.innerWidth > 1281;
export const LAPTOP = window.innerWidth > 1024;
