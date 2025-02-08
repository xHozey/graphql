import { login } from "./templates/login.js";
import { test } from "./templates/main.js";
import { extractUserData } from "./services/authentication.js";
import { checkAuthorization } from "./utils/helpers.js";
import { userIdentification } from "./services/user_identification.js";
import { userLevel } from "./services/user_level.js";
import { userSkills } from "./services/user_skills.js";
import { initGraphs } from "./services/graphs.js";
const styles = document.getElementById("styles");
const appConatiner = document.getElementById("app");

export const handleLocation = async () => {
  const path = window.location.pathname;
  switch (path) {
    case "/":
      styles.innerHTML = `<link rel="stylesheet" href="./app/styles/main.css">`;
      checkAuthorization();
      appConatiner.innerHTML = test;
      await userIdentification();
      await userLevel();
      await userSkills();
      await initGraphs();

      break;
    case "/login":
      styles.innerHTML = `<link rel="stylesheet" href="./app/styles/login.css">`;
      appConatiner.innerHTML = login;
      extractUserData();
      break;
    default:
      appConatiner.innerHTML = `<h1>404 Page Not Found</h1>`;
      break;
  }
};

window.onpopstate = handleLocation;

handleLocation();
