# Users API

This document describes the Users API endpoints implemented in the Backend of this project. Currently documented endpoints:

- POST /users/register - Create a new user account
- POST /users/login - Authenticate and get JWT token
- GET /users/profile - Get authenticated user's profile
- GET /users/logout - Logout and invalidate token

---

## POST /users/register

Create a new user account.

- URL: `/users/register`
- Method: `POST`
- Auth: none
- Content-Type: `application/json`

### Request body

The endpoint expects a JSON body with the following fields:

- `firstname` (string) — required. Minimum length: 3 characters.
- `lastname` (string) — required. Minimum length: 3 characters.
- `email` (string) — required. Must be a valid email address.
- `password` (string) — required. Minimum length: 6 characters.

Example request JSON:

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

Validation rules are enforced using `express-validator`. If validation fails, the response will be a 400 Bad Request with details.

### Responses

- 201 Created
  - Description: User successfully created.
  - Body: `{ user, token }` where `user` is the created user object and `token` is a JWT for authentication.

- 400 Bad Request
  - Description: Validation error or missing fields in request body.
  - Body: `{ errors: [ ... ] }` (when express-validator fails) or `{ success: false, message: "Something went wrong" }` for generic input problems.

- 409 Conflict
  - Description: Email already exists.
  - Body: `{ success: false, message: "This email already exists" }`

- 500 Internal Server Error
  - Description: Unexpected server/database error while creating the user.
  - Body: `{ success: false, message: "Internal Server Error" }` or `{ success: false, message: "Something went wrong" }` in other error cases.

### Notes

- Passwords are hashed before saving using `bcrypt`.
- The created user model hides the `password` field by default (`select: false`).
- JWT secret is read from `process.env.JWT_SECRET` when generating tokens.

---

If you want additional endpoints documented or examples for cURL/Postman, tell me which format you prefer.

## POST /users/login

Authenticate an existing user and return a JWT.

- URL: `/users/login`
- Method: `POST`
- Auth: none
- Content-Type: `application/json`

### Request body

The endpoint expects a JSON body with the following fields:

- `email` (string) — required. Must be a valid email address.
- `password` (string) — required. Minimum length: 6 characters.

Example request JSON:

```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

Validation uses `express-validator`. If validation fails the endpoint returns a 400 response.

### Responses

- 200 OK
  - Description: Authentication successful.
  - Body: `{ success: true, user: { _id, fullname, email }, token }`

- 400 Bad Request
  - Description: Validation error or missing fields.
  - Body: `{ success: false, message: "Something went wrong" }` (generic) or `{ errors: [...] }` when validation details are present.

- 401 Unauthorized
  - Description: Invalid email or password.
  - Body: `{ success: false, message: "Invalid Email or Password" }`

- 500 Internal Server Error
  - Description: Unexpected server error.
  - Body: `{ success: false, message: "Internal Server Error" }`

### Notes

- Passwords are compared with bcrypt using the `comparePassword` method on the User model.
- On success a JWT token is returned which can be used for authenticated requests.

---

## GET /users/profile

Get the authenticated user's profile information.

- URL: `/users/profile`
- Method: `GET`
- Auth: **Required** - JWT Bearer Token
- Content-Type: `application/json`

### Authentication

Include the JWT token in the request either:
- As a Bearer token in the Authorization header: `Authorization: Bearer <token>`
- Or as an HTTP-only cookie named `token`

### Responses

- 200 OK
  - Description: Profile retrieved successfully.
  - Body: `{ success: true, user: {...}, message: "User found successfully" }`
  - Note: The user object excludes the password field.

- 401 Unauthorized
  - Description: Missing or invalid authentication token.
  - Body: `{ success: false, message: "Unauthorized - No token provided" }`
  - Body: `{ success: false, message: "Unauthorized - Invalid token" }`

- 500 Internal Server Error
  - Description: Server error while fetching profile.
  - Body: `{ success: false, message: "Internal Server Error" }`

---

## GET /users/logout

Logout the current user and invalidate their JWT token.

- URL: `/users/logout`
- Method: `GET`
- Auth: **Required** - JWT Bearer Token
- Content-Type: `application/json`

### Authentication

Same authentication requirements as `/users/profile`:
- Bearer token in Authorization header
- Or token cookie

### Responses

- 200 OK
  - Description: Successfully logged out and token blacklisted.
  - Body: `{ success: true, message: "Logged out successfully" }`

- 401 Unauthorized
  - Description: Missing or invalid authentication token.
  - Body: `{ success: false, message: "Unauthorized - No token provided" }`
  - Body: `{ success: false, message: "Unauthorized - Invalid token" }`

- 500 Internal Server Error
  - Description: Server error during logout.
  - Body: `{ success: false, message: "Internal Server Error" }`

### Notes

- The token used for authentication is blacklisted to prevent reuse.
- Both cookie and Authorization header tokens are handled.
