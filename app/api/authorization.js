import { DOMAIN_NAME, SIGNIN_API, DATA_API } from "../config.js";
import { nav } from "../utils/helpers.js";
export const requestToken = async (user) => {
  try {
    const res = await fetch(DOMAIN_NAME + SIGNIN_API, {
      method: "POST",
      headers: {
        Authorization: `Basic ` + btoa(`${user.username}:${user.password}`),
      },
    });
    const token = await res.json();
    if (!res.ok) {
      return;
    }
    return token;
  } catch (err) {
    console.error(err);
  }
};

export const checkAuthorization = async () => {
  const token = localStorage.getItem("Authorization");
  console.log(token);
  const res = await fetch(DOMAIN_NAME + DATA_API, {
    method: "GET",
    headers: {
      Authorization: `Bearer ` + token,
    },
  });
  console.log(res);
  if (!res.ok) {
    nav("/graphql/login");
  }
};
