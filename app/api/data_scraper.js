import { DOMAIN_NAME, DATA_API, QUERY } from "../config.js";
import { nav } from "../utils/helpers.js";
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
      nav("/graphql/login");
      return data;
    }
    if (data.errors) {
      nav("/graphql/login");
      return data;
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
