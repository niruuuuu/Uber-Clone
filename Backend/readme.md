# Users API

This document describes the Users API endpoints implemented in the Backend of this project. Currently documented endpoint:

- POST /users/register

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