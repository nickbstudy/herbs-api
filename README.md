## herbs-api

#### User Controller:

Register new
`POST /api/users`

Login:
`POST /api/users/login`

---

#### Herb controller

All require a bearer token.

Get all herbs:
`GET /api/herbs`

Add a herb:
`POST /api/herbs`

Delete a herb:
`DELETE /api/herbs/:id`

Update herb amount:
`PATCH /api/herbs/:id`
