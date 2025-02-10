import { DOMAIN_NAME, DATA_API, QUERY } from "../config.js";

export const extractData = async () => {
  const token = localStorage.getItem("Authorization");
  try {
    const res = await fetch(DOMAIN_NAME + DATA_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: QUERY }),
    });
    const data = await res.json();

    if (!res.ok) {
      window.location.href = "/login";
      return data;
    }
    if (data.errors) {
      window.location.href = "/login";
      return data
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
