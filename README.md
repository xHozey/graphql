# GraphQL Profile Page Project

## Project Overview

The goal of this project is to learn and practice the **GraphQL query language** by creating your own personalized profile page.

You will use the provided GraphQL endpoint to query your data and dynamically populate your profile. To access this data, a **login page** must be implemented using JWT authentication.

---

## Features & Requirements

### 1. Login & Authentication
- Create a login page where users can authenticate using:
  - `username:password` OR  
  - `email:password`
- Authentication is done via a POST request to the signin endpoint:  
  `https://learn.zone01oujda.ma/api/auth/signin`
- Use **Basic Authentication** with Base64 encoding for sending credentials.
- If credentials are invalid, display an appropriate error message.
- On successful login, receive a **JWT** token to authorize GraphQL requests.
- Implement a logout method to clear session data.

### 2. Profile Page
- After authentication, query your user-specific data from the GraphQL endpoint:  
  `https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql`
- Display at least **three pieces of personal information** such as:
  - Basic user identification (e.g. login, id)
  - XP amount
  - Grades
  - Audits
  - Skills
- Include a **mandatory statistics section** where you generate at least **two different graphs** using **SVG**.
  - Examples of graphs:
    - XP earned over time (progress)
    - XP earned by project
    - Audit pass/fail ratio
    - Projects pass/fail ratio
    - Piscine (JS/Go) stats
    - Attempts per exercise
- Graphs can be interactive or animated, but must follow good UI principles.

---

## GraphQL Queries

- Use **normal queries**, **nested queries**, and **queries with arguments** to fetch data.
- Example queries:

  - Simple user query:
    ```graphql
    {
      user {
        id
        login
      }
    }
    ```
  
  - Query with arguments (fetch object by id):
    ```graphql
    {
      object(where: { id: { _eq: 3323 }}) {
        name
        type
      }
    }
    ```

  - Nested query example:
    ```graphql
    {
      result {
        id
        user {
          id
          login
        }
      }
    }
    ```

- Inspect JWT token to extract the authenticated user's ID and use it in queries.

---

## Data Tables Reference

- `user` table: user information (id, login, etc.)  
- `transaction` table: XP data, audits  
- `progress` table: exercise and project grades over time  
- `result` table: student progress and grades  
- `object` table: info about exercises and projects  

For detailed schema and relationships, use **GraphiQL** available when logged into the platform.

---

## Hosting

- You must **host your profile page** on a public platform such as:
  - GitHub Pages
  - Netlify
  - Vercel
  - Any other hosting service of your choice

---

## Learning Outcomes

- How to build and authenticate with **JWT**  
- Understanding and writing **GraphQL queries** (normal, nested, with arguments)  
- Working with **GraphQL API endpoints**  
- Fetching and displaying dynamic data in UI  
- Creating interactive and/or animated **SVG graphs**  
- Basics of **authentication, authorization, and UI/UX** design  
- Deploying a web application on public hosting  

---

## How to Use

1. Open the login page and enter your credentials (username/email + password).  
2. Upon successful login, you will be redirected to your profile page.  
3. View your personal information and explore your progress and statistics through SVG graphs.  
4. Use the logout option to end your session securely.  

---

## Notes

- Make sure all API calls include the JWT token in the Authorization header as `Bearer <token>`.  
- Handle errors gracefully and provide user feedback on login or query failures.  
- Keep UI intuitive and accessible.  

---

## License

This project is for educational purposes and personal learning only.
