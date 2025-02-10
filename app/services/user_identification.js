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

export const userIdentification = async (user) => {
  const userContainer = document.querySelector(".user-info");
  const login = identificationLabels(user.login, "Username");
  const firstname = identificationLabels(user.firstName, "First Name");
  const lastname = identificationLabels(user.lastName, "Last Name");
  userContainer.append(login, firstname, lastname);
};

