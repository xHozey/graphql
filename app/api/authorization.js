import { DOMAIN_NAME, SIGNIN_API } from "../config.js";

export const requestToken = async (user) => {
  try {
    const res = await fetch(DOMAIN_NAME + SIGNIN_API, {
      method: "POST",
      headers: {
        Authorization: `Basic ` + btoa(`${user.username}:${user.password}`),
      },
    });
    if (!res.ok) {
      return;
    }
    const token = await res.json();
    return token;
  } catch (err) {
    console.error(err);
  }
};


