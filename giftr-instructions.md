# Giftr API

Using Node.js, Express, Mongoose and MongoDB, you will build the RESTful API web service for a prototype of a fictitious application to track gift ideas for your friends. This initial proof of concept (PoC) will have limited capabilities but should demonstrate the potential of a full-scale application.

- [x] Each registered user can create a list of people for whom they are collecting gift ideas.
- [x] The user can then add one or more gift ideas for each person on their list.

- [ ] PoC will allow authenticated users to perform basic CRUD operations on two primary resources: PEOPLE and GIFTS 
- [x] The PERSON model represent the people for whom you are collecting
- [x] gift ideas and will have an array of embedded GIFT models
- [x] GIFTS will have an ownerId relationship to the owning User model

## Core Requirements

- [x] Implement basic user user management functions

  - [x] authentication with Google OAuth and JWT
  - [x] logout current user

- [x] Protected API routes require a valid JWT in the Authorization header.

- [x] Middleware functions should be employed to avoid repetitive route handler code.

- [ ] Single resource requests should return any related resources as fully populated embedded documents.

- [ ] Resource list requests should return an array of the primary resource objects only, without populating any related objects 
(PEOPLE/GIFTS)

- [x] All requests containing user/client supplied data should be sanitized to protect against XSS and Query Injection attacks.

- [x] All schema validation errors should be caught and returned to the client with the correct status code and error message.

## Response Payload

- [x] All responses will be in the form of a JSON formatted object.
- [?] *This payload object must include one of (but not both at the same time) a data property or an error property.* (data: returnedData)
- [?] *For "list" routes, the data property must be populated an array of zero or more of the requested resource objects.*
- [?] For "retrieve" routes, the data property must be populated with a single resource object.
- [x] If the requested single resource, or sub-resource (embedded document) does not exist, a 404 error response should be sent.

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
```
{
"data": [
{
"txt": "string",
"store": "string",
"url": "string"
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

- [ ] Action Method Resource Path
- [ ] Authenticate User GET /auth/google?redirect_url
- [ ] Accept google response GET /auth/google/callback
- [ ] Logout User GET /auth/logout

## API Routes

- [ ] Access to routes relating to creating, updating or deleting gift ideas for a particular Person object will be limited to authenticated users who are either the owner or in the sharedWith list for that Person.
- [ ] Deleting a Person object will be restricted exclusively to its owner.

### Person Routes

Action                    Method      Resource           Path Notes
List all people           GET         /api/people        Gift ideas not populated
Get details for a person  GET         /api/people/:id    Gift ideas fully populated
Create a person           POST        /api/people
Replace a person          PUT         /api/people/:id    Only the owner
Update a person           PATCH       /api/people/:id    Only the owner
Remove a person           DELETE      /api/people/:id    Only the owner

### Gift Routes

Action	                 Method	     Resource       
List all gifts	         GET	       /api/people/:id/gifts
Get details for a gift	 GET	       /api/people/:id/gifts/:giftId
Create a gift	           POST	       /api/people/:id/gifts
Update a gift	           PATCH	     /api/people/:id/gifts/:giftId
Remove a gift	           DELETE	     /api/people/:id/gifts/:giftId

## Resource Schema
There are three required model classes. Their schema requirements are listed below.

### Person

Property	    Type	                      Required	    Max (length/value)	    Default
name	        String	                    true		
dob	          Date	                      true		
ownerId	      ObjectId, ref: 'User'	      true		                              Current user
gifts	        [ Gift ]			
createdAt	    Date			                                                        Date.now()
updatedAt	    Date			                                                        Date.now()

- [ ] The createdAt and updatedAt properties should be set automatically by the database. 
- [ ] Any client supplied data for these two properties should be discarded.

- [ ] The gifts property takes an array of zero or more Gift sub-documents.
- [ ] The ownerId property takes a single User ID.

### Gift
Property	     Type	      Required
txt	           String	    true
store	         String	    true
url	           String	    true
createdAt	     Date	      handled by mongoose
updatedAt	     Date	      handled by mongoose

### User
Property	        Type	        Required	    Default	      Unique	    Notes
name	            String	      true			                              comes from google
googleId	        String	      true		                    true	      comes from google
createdAt	        Date	        true			                              handled by mongoose
updatedAt	        Date	        true			                              handled by mongoose

## Logistics

- [x] Create a new private repository on Github.
- [x] Clone the repo to your laptop.
- [x] Initialize the repository yarn init (make sure to fill it out with correct values)
- [x] Install dependencies with yarn.
- [x] Build the project on your laptop.
- [x] Test each route with Postman, making sure to test both valid and invalid data.
- [x] Make git commits as you complete each requirement.
- [x] When everything is complete, push the final commit back up to GitHub
- [x] Submit both two URLs on Brightspace: the GitHub repo URL and the URL to your deployed Render API.

# In class review

- when doing a getAll, do not return the gifts
- only return gifts on getOne

- giftrouter
  "/gifts"
  "/gifts/:id"

  middleware takes require personId = req.params.id
  next()

- bring in compression module into index.js (with other security modules)

```
ownerId: {
  type: Schema.Types.ObjectId,
  required: true,
  ref: 'user'
}
```

`const { _id: ownerId } = req.user;`

- use req.sanitizedBody in controllers instead of req.body
