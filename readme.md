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
