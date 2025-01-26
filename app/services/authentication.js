import { requestToken } from "../api/authorization.js";
import { showError, nav } from "../utils/helpers.js";
export const extractUserData = () => {
  const signBtn = document.getElementById("signin-btn");
  const username = document.getElementById("email");
  const password = document.getElementById("password");
  const error = document.getElementById("error-message");
  signBtn.addEventListener("click", async () => {
    error.classList.add("hidden");
    if (!username.value.trim() || !password.value.trim()) {
      showError();
      return;
    }
    const token = await requestToken({
      username: username.value,
      password: password.value,
    });
    if (!token) {
      showError();
      return;
    }
    localStorage.setItem("Authorization", token);
    nav("/");
  });
};


