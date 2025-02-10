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

export const checkAuthorization = () => {
  const token = localStorage.getItem("Authorization");
  if (!token) {
    window.location.href = "/login";
  }
};

export const formatType = (type) => {
  type = type.replace("skill_", "")
  type = type.split('-').join(' ')
  return type.charAt(0).toUpperCase() + type.slice(1)
}