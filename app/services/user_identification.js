import { extractData } from "../api/data_scraper.js";
import { identificationQuery } from "../utils/queries.js";

const userItemClass = `user-info-item`;

const identificationLabels = (name, label) => {
  const div = document.createElement("div");
  div.classList.add(userItemClass);
  div.innerHTML = `
  <div class="user-info-label">${label}</div>
  <div class="user-info-value">${name}</div>
  `;
  return div;
};

export const userIdentification = async () => {
  const userContainer = document.querySelector(".user-info");
  const data = await extractData(identificationQuery);
  const user = data.data.user[0];
  const login = identificationLabels(user.login, "Username");
  const firstname = identificationLabels(user.firstName, "First Name");
  const lastname = identificationLabels(user.lastName, "Last Name");
  userContainer.append(login, firstname, lastname);
};

