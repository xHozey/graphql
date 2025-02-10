import { login } from "./templates/login.js";
import { main } from "./templates/main.js";
import { extractUserData } from "./services/authentication.js";
import { checkAuthorization } from "./utils/helpers.js";
import { userIdentification } from "./services/user_identification.js";
import { userLevel } from "./services/user_level.js";
import { userSkills } from "./services/user_skills.js";
import { extractData } from "./api/data_scraper.js";
import { initGraphs } from "./services/graphs.js";
import { nav } from "./utils/helpers.js";
const styles = document.getElementById("styles");
const appConatiner = document.getElementById("app");



export const handleLocation = async () => {
  appConatiner.innerHTML = ""
  const path = window.location.pathname;
  switch (path) {
    case "/graphql/":
      styles.innerHTML = `<link rel="stylesheet" href="./app/styles/main.css">`;
      checkAuthorization();
      appConatiner.innerHTML = main;
      const data = await extractData();
      await userIdentification(data.data.user[0]);
      await userLevel(data.data.currentLevel.aggregate.max);
      await userSkills(data.data.skills);
      await initGraphs(data.data);
      document.querySelector(".logout-btn").addEventListener("click", () => {
        localStorage.removeItem("Authorization");
        nav("/graphql/login")
      });
      break;
    case "/graphql/login":
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
