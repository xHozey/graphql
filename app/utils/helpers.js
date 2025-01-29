import { handleLocation } from "../app.js";


export const showError = () => {
  const error = document.querySelector(".error");
  error.textContent = `Invalid email/username or password. Please try again.`;
  error.classList.remove("hidden");
  setTimeout(() => {
    error.classList.add("hidden");
  }, 2000);
};

export const nav = (path) => {
  window.history.pushState({}, "", path);
  handleLocation();
};

export const checkAuthorization = async () => {
  const token = localStorage.getItem("Authorization");
  if (!token) {
    window.location.href = "/login";
  }
};