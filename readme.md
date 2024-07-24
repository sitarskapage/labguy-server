READ USERS:

`http://localhost:3000/api/users`

CREATE USER:

```bash

curl -X POST http://localhost:3000/api/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "email": "info@jakubkanna.com"
  }'

```

UPDATE USER:

```bash

curl -X POST http://localhost:3000/api/users/update/3 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "anewmaik@address.com"
  } '

```

DELETE USER:

```bash

curl -X POST http://localhost:3000/api/users/delete/3 \
  -H "Content-Type: application/json" \


```

DELETE MANY USERS:

```bash

curl -X POST http://localhost:3000/api/users/deleteMany \
  -H "Content-Type: application/json" \
  -d '{
    "ids":[1,2,3,4]
  } '

```

UPDATE PROFILE:

```bash
curl -X POST http://localhost:3000/api/profiles/update/1 \
  -H "Content-Type: application/json" \
  -d '{
    "html_statement": "Updated statement2",
    "html_additional": "Additional info",
    "portfolio_pdf": "http://example.com/portfolio.pdf",
    "userId": 1,
    "contact": [
      {
        "email": "newemail@example.com",
        "socialmedia": [
          {
            "id": 1,
            "platform": "Twitter22AAAAAAAAAAAAAAAAAA",
            "profileUrl": "http://twitter.com/newprofile",
            "username": "newusername"
          },
          {
            "id": 2,
            "platform": "LinkedIn",
            "profileUrl": "http://linkedin.com/in/newprofile",
            "username": "newusername3"
          }
        ]
      }
    ]
  }'


```
