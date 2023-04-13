# Giftr API

Using Node.js, Express, Mongoose and MongoDB, you will build the RESTful API web service for a prototype of a fictitious application to track gift ideas for your friends. This initial proof of concept (PoC) will have limited capabilities but should demonstrate the potential of a full-scale application.

- [ ] Each registered user can create a list of people for whom they are collecting gift ideas.
- [ ] The user can then add one or more gift ideas for each person on their list.

- [ ] PoC will allow authenticated users to perform basic CRUD operations on two primary resources: PEOPLE and GIFTS
- [ ] The PERSON model represent the people for whom you are collecting
- [ ] gift ideas and will have an array of embedded GIFT models
- [ ] GIFTS will have an ownerId relationship to the owning User model

## Core Requirements

- [ ] Implement basic user user management functions

  - [ ] authentication with Google OAuth and JWT
  - [ ] logout current user

- [ ] Protected API routes require a valid JWT in the Authorization header.

- [ ] Middleware functions should be employed to avoid repetitive route handler code.

- [ ] Single resource requests should return any related resources as fully populated embedded documents.

- [ ] Resource list requests should return an array of the primary resource objects only, without populating any related objects.

- [ ] All requests containing user/client supplied data should be sanitized to protect against XSS and Query Injection attacks.

- [ ] All schema validation errors should be caught and returned to the client with the correct status code and error message.

## Response Payload

- [ ] All responses will be in the form of a JSON formatted object.
- [ ] This payload object must include one of (but not both at the same time) a data property or an error property.
- [ ] For "list" routes, the data property must be populated an array of zero or more of the requested resource objects.
- [ ] For "retrieve" routes, the data property must be populated with a single resource object.
- [ ] If the requested single resource, or sub-resource (embedded document) does not exist, a 404 error response should be sent.

### Example Data Response

`GET /api/people`

```
{
  "data": [
    {
      "_id": "641f45cc4de5a0f56bbc702e",
      "name": "Caitlin",
      "dob": "2023-03-25T19:04:43.966Z"
    }
  ]
}
```

### Example Errors Response

`GET /api/people/[bad_id]`

```
// Status 404
{
  "error": "Person with id [bad_id] not found"
}
```

### Example Unauthenticated Response

`GET /api/people/ headers: { Authorization: 'Invalid or missing JWT' }`

```
// Status 401
{
  "error": "JWT error: invalid token"
}
```

## Auth Routes
