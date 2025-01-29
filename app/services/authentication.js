import { requestToken } from "../api/authorization.js";
import { nav, showError } from "../utils/helpers.js";

export const extractUserData = () => {
  const signBtn = document.getElementById("signin-btn");
  const username = document.getElementById("email");
  const password = document.getElementById("password");
  signBtn.addEventListener("click", async () => {
    if (!username.value.trim() || !password.value.trim()) {
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
