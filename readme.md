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
curl -X POST http://localhost:3000/api/profiles/update/1   -H "Content-Type: application/json"   -d '{
  "html_statement": "Updated statement2",
  "html_additional": "Additional info 2",
  "portfolio_pdf": "http://example.com/portfolio.pdf",
  "contact": [
    {
      "email": "Anewemail22@example.com",
      "id": 1,
      "socialmedia": [
        {
        "id":1,
          "platform": "A",
          "profileUrl": "http://twitter.com/newprofile",
          "username": "newusername"
        },
        {
          "id":2,
          "platform": "B",
          "profileUrl": "http://linkedin.com/in/newprofile",
          "username": "newusername3"
        }
      ]
    },
    {
      "email": "2Bnewemail22@example.com",
      "id": 2,
      "socialmedia": [
        {
          "id":3,
          "platform": "C",
          "profileUrl": "http://twitter.com/newprofile",
          "username": "newusername"
        },
        {
          "id":4,
          "platform": "D",
          "profileUrl": "http://linkedin.com/in/newprofile",
          "username": "newusername3"
        }
      ]
    }
  ]
}'


```
