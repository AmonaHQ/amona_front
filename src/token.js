import jwt from "jsonwebtoken";

const setCookie = (name, value, days = 2) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
const getCookie = (name = "authToken") => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
const eraseCookie = (name = "authToken") => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};
const verifyToken = async (token) => {
  try {
    const isVerified = await jwt.verify(
      token,
      process.env.REACT_APP_JWT_SECRET
    );

    return {
      success: true,
      ...isVerified,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
const useAuthToken = () => {
  return [getCookie(), setCookie, eraseCookie, getCookie];
};
export { verifyToken, useAuthToken };
