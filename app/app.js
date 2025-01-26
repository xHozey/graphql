import { login } from "./templates/login.js";
import { extractUserData } from "./services/authentication.js";
import { checkAuthorization } from "./api/authorization.js";
const appConatiner = document.getElementById("app");

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

export const handleLocation = async () => {
  const path = window.location.pathname;
  switch (path) {
    case "/graphql/":
      await checkAuthorization();
      appConatiner.innerHTML = `<h1>Hello World</h1>`;
      break;
    case "/graphql/login":
      appConatiner.innerHTML = login;
      extractUserData();
      break;
  }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
