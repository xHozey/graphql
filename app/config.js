export const DOMAIN_NAME = "https://learn.zone01oujda.ma";
export const SIGNIN_API = "/api/auth/signin";
export const DATA_API = "/api/graphql-engine/v1/graphql";
export const QUERY = `{
    user {
      login
      firstName
      lastName
    }
    currentLevel: transaction_aggregate(
      where: {
        type: { _eq: "level" }
        event: { object: { name: { _eq: "Module" } } }
      }
    ) {
      aggregate {
        max {
          amount
        }
      }
    }
    skills: transaction(
      where: { type: { _like: "skill%" } }
      order_by: { amount: desc }
    ) {
      type
      amount
    }
    xpPerTime: transaction(
      where: { object: { type: { _eq: "project" } }, type: { _eq: "xp" } }
    ) {
      createdAt
      amount
    }
    xpPerProject: transaction(
      where: { object: { type: { _eq: "project" } }, type: { _eq: "xp" } } order_by: {createdAt: desc} limit: 5
    ) {
      object {
        name
      }
      amount
    }
  }`;
