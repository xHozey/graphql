import { DOMAIN_NAME, DATA_API } from "../config.js";

export const extractData = async (query) => {
  const token = localStorage.getItem("Authorization");

  try {
    const res = await fetch(DOMAIN_NAME + DATA_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) {
      return;
    }
    const data = await res.json();
    if (data.errors) {
      window.location.href = "/login"
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
