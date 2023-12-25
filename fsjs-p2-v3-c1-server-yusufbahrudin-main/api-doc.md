# Cuisine API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /cuisines`
- `GET /cuisines/:id`
- `POST /cuisines`
- `GET /categories`
- `DELETE /cuisines/:id`
- `PUT /cuisines/:id`
- `PATCH /cuisines/:id/status`
- `GET /history`

- `POST /public/login`
- `POST /public/register`

- `GET /public/cuisines`
- `GET /public/cuisines?search=`
- `GET /public/cuisines?page=`
- `GET /public/cuisines/:id`

- `GET /public/bookmark`
- `POST /public/bookmark:id`
- `DELETE /public/bookmark:id`

&nbsp;

## 1. POST http://localhost:3000/register

Request:

- body:
  z

```json
{
  "username": "test",
  "email": "testgmail.cxom",
  "password": "test",
  "phoneNumber": "869696969",
  "address": "test"
}
```

_Response (201 - Created)_

```json
{
  "user": {
    "id": 4,
    "email": "test@gmail.com"
  }
}
```

_Response (400 - Bad Request)_

```json
{
    "msg": "Please enter your username"
}
OR
{
    "msg": "Please enter your email"
}
OR
{
  "message": "Email must be unique"
}
OR
{
    "msg": "Please enter your password"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST http://localhost:3000/login

Request:

- body:

```json
{
  "email": "test@gmail.com",
  "password": "test"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjk0MjQ3NjA0fQ.GImRYDGv2BCFast4oLWp_Q58IiYNXNDU7VQFN9sV_hU"
}
```

_Response (400 - Bad Request)_

```json
{
    "msg": "Email/Password is required"
}
OR
{
    "msg": "Email/Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "msg": "Email/Password is invalid"
}
```

&nbsp;

## 3. GET http://localhost:3000/cuisines

Description:

- Get all cuisines from database

Request:

- headers:

```json
{
  "access_token": "eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjk0MjQ3NjA0fQ.GImRYDGv2BCFast4oLWp_Q58IiYNXNDU7VQFN9sV_hU"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 6,
    "name": "bebek carok",
    "description": "indonesian food from surabaya",
    "price": 40000,
    "imgUrl": "hdhdhduhdj.jpg",
    "authorId": 2,
    "categoryId": 1,
    "createdAt": "2023-09-06T09:18:10.608Z",
    "updatedAt": "2023-09-06T09:18:10.608Z",
    "User": {
      "id": 2,
      "username": "ferdi",
      "email": "ferdi@gmail.com",
      "password": "ferdi",
      "role": "admin",
      "phoneNumber": "248-253-0826",
      "address": "81 Arapahoe Road",
      "createdAt": "2023-09-05T16:10:26.379Z",
      "updatedAt": "2023-09-05T16:10:26.379Z"
    },
    "Category": {
      "id": 1,
      "name": "Asian Cuisine",
      "createdAt": "2023-09-05T16:10:26.380Z",
      "updatedAt": "2023-09-05T16:10:26.380Z"
    }
  },
  {
    "id": 1,
    "name": "Ayam Kecumbrung",
    "description": "Restoran dengan menu makanan Asia",
    "price": 50000,
    "imgUrl": "https://example.com/restaurant1.jpg",
    "authorId": 1,
    "categoryId": 1,
    "createdAt": "2023-09-05T16:10:26.380Z",
    "updatedAt": "2023-09-05T16:10:26.380Z",
    "User": {
      "id": 1,
      "username": "yusuf",
      "email": "yusuf@gmail.com",
      "password": "yusuf",
      "role": "admin",
      "phoneNumber": "248-253-0826",
      "address": "81 Arapahoe Road",
      "createdAt": "2023-09-05T16:10:26.379Z",
      "updatedAt": "2023-09-05T16:10:26.379Z"
    },
    "Category": {
      "id": 1,
      "name": "Asian Cuisine",
      "createdAt": "2023-09-05T16:10:26.380Z",
      "updatedAt": "2023-09-05T16:10:26.380Z"
    }
  },
  {
    "id": 2,
    "name": "Spagethi",
    "description": "Restoran Italia dengan berbagai pasta lezat",
    "price": 80000,
    "imgUrl": "https://example.com/restaurant2.jpg",
    "authorId": 1,
    "categoryId": 2,
    "createdAt": "2023-09-05T16:10:26.380Z",
    "updatedAt": "2023-09-05T16:10:26.380Z",
    "User": {
      "id": 1,
      "username": "yusuf",
      "email": "yusuf@gmail.com",
      "password": "yusuf",
      "role": "admin",
      "phoneNumber": "248-253-0826",
      "address": "81 Arapahoe Road",
      "createdAt": "2023-09-05T16:10:26.379Z",
      "updatedAt": "2023-09-05T16:10:26.379Z"
    },
    "Category": {
      "id": 2,
      "name": "Italian Cuisine",
      "createdAt": "2023-09-05T16:10:26.380Z",
      "updatedAt": "2023-09-05T16:10:26.380Z"
    }
  },
  {
    "id": 3,
    "name": "Pasta",
    "description": "Restoran dengan hidangan Meksiko yang pedas",
    "price": 60000,
    "imgUrl": "https://example.com/restaurant3.jpg",
    "authorId": 2,
    "categoryId": 3,
    "createdAt": "2023-09-05T16:10:26.380Z",
    "updatedAt": "2023-09-05T16:10:26.380Z",
    "User": {
      "id": 2,
      "username": "ferdi",
      "email": "ferdi@gmail.com",
      "password": "ferdi",
      "role": "admin",
      "phoneNumber": "248-253-0826",
      "address": "81 Arapahoe Road",
      "createdAt": "2023-09-05T16:10:26.379Z",
      "updatedAt": "2023-09-05T16:10:26.379Z"
    },
    "Category": {
      "id": 3,
      "name": "Mexican Cuisine",
      "createdAt": "2023-09-05T16:10:26.380Z",
      "updatedAt": "2023-09-05T16:10:26.380Z"
    }
  },
  {
    "id": 4,
    "name": "Fuyunghay",
    "description": "Restoran khas China dengan masakan tradisional",
    "price": 75000,
    "imgUrl": "https://example.com/restaurant4.jpg",
    "authorId": 3,
    "categoryId": 4,
    "createdAt": "2023-09-05T16:10:26.380Z",
    "updatedAt": "2023-09-05T16:10:26.380Z",
    "User": {
      "id": 3,
      "username": "frengki",
      "email": "frengki@gmail.com",
      "password": "fengki",
      "role": "user",
      "phoneNumber": "248-253-0826",
      "address": "81 Arapahoe Road",
      "createdAt": "2023-09-05T16:10:26.379Z",
      "updatedAt": "2023-09-05T16:10:26.379Z"
    },
    "Category": {
      "id": 4,
      "name": "Chinese Cuisine",
      "createdAt": "2023-09-05T16:10:26.380Z",
      "updatedAt": "2023-09-05T16:10:26.380Z"
    }
  },
  {
    "id": 5,
    "name": "Hokben",
    "description": "Restoran Jepang dengan menu sushi dan sashimi",
    "price": 90000,
    "imgUrl": "https://example.com/restaurant5.jpg",
    "authorId": 2,
    "categoryId": 5,
    "createdAt": "2023-09-05T16:10:26.380Z",
    "updatedAt": "2023-09-05T16:10:26.380Z",
    "User": {
      "id": 2,
      "username": "ferdi",
      "email": "ferdi@gmail.com",
      "password": "ferdi",
      "role": "admin",
      "phoneNumber": "248-253-0826",
      "address": "81 Arapahoe Road",
      "createdAt": "2023-09-05T16:10:26.379Z",
      "updatedAt": "2023-09-05T16:10:26.379Z"
    },
    "Category": {
      "id": 5,
      "name": "Japanese Cuisine",
      "createdAt": "2023-09-05T16:10:26.380Z",
      "updatedAt": "2023-09-05T16:10:26.380Z"
    }
  },
  {
    "id": 9,
    "name": null,
    "description": null,
    "price": null,
    "imgUrl": null,
    "authorId": 6,
    "categoryId": null,
    "createdAt": "2023-09-09T08:28:57.988Z",
    "updatedAt": "2023-09-09T08:28:57.988Z",
    "User": {
      "id": 6,
      "username": "test",
      "email": "test@gmail.com",
      "password": "$2a$10$BWjtszi0K8jSLopD9Ul37uNWi0TdIGPUa0BbnMYHYZFTAqJs0TP3m",
      "role": "admin",
      "phoneNumber": null,
      "address": null,
      "createdAt": "2023-09-06T17:25:27.346Z",
      "updatedAt": "2023-09-06T17:25:27.346Z"
    },
    "Category": null
  },
  {
    "id": 8,
    "name": null,
    "description": null,
    "price": null,
    "imgUrl": null,
    "authorId": 6,
    "categoryId": null,
    "createdAt": "2023-09-09T08:20:12.493Z",
    "updatedAt": "2023-09-09T08:20:12.493Z",
    "User": {
      "id": 6,
      "username": "test",
      "email": "test@gmail.com",
      "password": "$2a$10$BWjtszi0K8jSLopD9Ul37uNWi0TdIGPUa0BbnMYHYZFTAqJs0TP3m",
      "role": "admin",
      "phoneNumber": null,
      "address": null,
      "createdAt": "2023-09-06T17:25:27.346Z",
      "updatedAt": "2023-09-06T17:25:27.346Z"
    },
    "Category": null
  }
]
```

&nbsp;

## 4. GET http://localhost:3000/cuisines/:id

Description

- Get or search detail cuisine by id

#### Response

\_200 - OK

- Body
  ```json
  {
    "id": 1,
    "name": "Ayam Kecumbrung",
    "description": "Restoran dengan menu makanan Asia",
    "imgUrl": "https://example.com/restaurant1.jpg",
    "authorId": 1,
    "caregoryId": 1
  }
  ```
  \_404 - Not Found
- Body
  ```json
  {
    "message": "404 Data Not Found"
  }
  ```
  &nbsp;

## 5. Post http://localhost:3000/cuisines

Description:

- Post cuisines from database

Request:

- headers:

```json
{
  "id": 15,
  "name": "sate",
  "description": "indonesian food from surabayaaaa",
  "price": 40000000,
  "imgUrl": "hdhdhduhdj.jpggggg",
  "categoryId": 1,
  "authorId": 6,
  "updatedAt": "2023-09-10T20:09:39.128Z",
  "createdAt": "2023-09-10T20:09:39.128Z"
}
```

&nbsp;

## 6. GET http://localhost:3000/categories

Description:

- Get categories from database

Request:

- headers:

```json
[
  {
    "id": 1,
    "name": "Asian Cuisine"
  },
  {
    "id": 2,
    "name": "Italian Cuisine"
  },
  {
    "id": 3,
    "name": "Mexican Cuisine"
  },
  {
    "id": 4,
    "name": "Chinese Cuisine"
  },
  {
    "id": 5,
    "name": "Japanese Cuisine"
  }
]
```

&nbsp;

## 7. DELETE /cuisines/:id

Description:

- Delete cuisines by id

Request:

- headers:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjk0MjQ3NjA0fQ.GImRYDGv2BCFast4oLWp_Q58IiYNXNDU7VQFN9sV_hU"
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Products with id:6 success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Product not found"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

&nbsp;

## 8 PUT http://localhost:3000/cuisines/:id

Description

- Edit data cuisine

Request

- Body
  ```json
  {
    "name": "Babi Guling",
    "description": "makanan terlezat misalnya, astagfirulloh",
    "imgUrl": "http://dummyimage.com/139x100.png/dddddd/000000",
    "categoryId": 4,
    "authorId": 3
  }
  ```

Response

_200 - OK_

- Body
  ```json
  {
    "message": "Cuisine with id 10 updated"
  }
  ```
  &nbsp;

## 9. PATCH http://localhost:3000/cuisines/:id/:status

Description

- Edit cuisine status

Response

_200 - OK_

- Body
  ```json
  {
    "message": "menus (babi guling) with id 10 has been updated from Active to Archived"
  }
  ```
  &nbsp;

## 10. PATCH http://localhost:3000/history

Description

- Get all history / logs

Response

_200 - OK_

- Body

  ```json
  [
    {
      "id": 1,
      "name": "Sedang coba",
      "description": "Menus (Babi guling) with id 10 has been updated from Active to Archived",
      "updatedBy": "yusuf",
      "createdAt": "2023-08-14T10:40:40.830Z",
      "updatedAt": "2023-08-14T10:40:40.830Z"
    }
  ]
  ```

  &nbsp;

## 11. POST http://localhost:3000/public/register

Description

- add or register account

Request

- Body
  ```json
  {
    "email": "monster@gmail.com",
    "password": "wkwkwk"
  }
  ```

Response

_201 - Created_

- Body
  ```json
  {
    "id": 3,
    "role": "customer",
    "email": "monster@gmail.com",
    "token": "string"
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "name": "Validation Error",
    "message": [
      "Username is required !",
      "Email is required !",
      "Password is required !",
      "Phone number is required !",
      "Address is required !"
    ]
  }
  ```
  &nbsp;

### 12. POST http://localhost:3000/public/login

Description

- login

Request

- Body
  ```json
  {
    "email": "monster@gmail.com",
    "password": "wkwkwk"
  }
  ```

Response

_200 - OK_

- Body

  ```json
  {
    "id": 3,
    "role": "customer",
    "email": "monster@gmail.com",
    "token": "string"
  }

  _401 - Bad Request_

  ```

- Body
  ```json
  {
    "name": "Unauthorized",
    "message": "Invalid email or password !"
  }
  ```
  &nbsp;

## 13. GET http://localhost:3000/public/cuisines

Description

- get data cuisine

Response

_200 - OK_

- Body
  ```json
  {
    "currentPage": 1,
    "totalPage": 10,
    "total": 6,
    "data": [
      {
        "id": 1,
        "title": "Ayam Kecumbrung",
        "description": "Restoran dengan menu makanan Asia",
        "imgUrl": "https://example.com/restaurant1.jpg",
        "categoryId": 1,
        "authorId": 1,
        "status": "Active",
        "createdAt": "2023-08-23T10:53:25.559Z",
        "updatedAt": "2023-08-23T10:53:25.559Z"
      }
    ]
  }
  ```
  &nbsp;

## 14. GET http://localhost:3000/public/cuisines/:id

Description

- get cuisine by id

Response

_200 - OK_

- Body

  ```json
  {
    "id": 1,
    "title": "Ayam Kecumbrung",
    "description": "Restoran dengan menu makanan Asia",
    "imgUrl": "https://example.com/restaurant1.jpg",
    "categoryId": 1,
    "authorId": 1,
    "status": "Active",
    "createdAt": "2023-08-23T10:53:25.559Z",
    "updatedAt": "2023-08-23T10:53:25.559Z",
    "QRcode": "qrcode data"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": "Cuisine Data Not Found"
  }
  ```
  &nbsp;

## 15. GET http://localhost:3000/public/cuisines?search=data

Description

- get cuisine by search

Response

_200 - OK_

- Body
  ```json
  {
    "search": "ay",
    "currentPage": 1,
    "totalPage": 3,
    "total": 6,
    "data": [
      {
        "id": 1,
        "title": "Ayam Kecumbrung",
        "description": "Restoran dengan menu makanan Asia",
        "imgUrl": "https://example.com/restaurant1.jpg",
        "categoryId": 1,
        "authorId": 1,
        "status": "Active",
        "createdAt": "2023-08-23T10:53:25.559Z",
        "updatedAt": "2023-08-23T10:53:25.559Z"
      }
    ]
  }
  ```
  &nbsp;

## 16. GET http://localhost:3000/public/cuisines?page=2

Description

- get cuisine with pagination

Response

_200 - OK_

- Body

  ```json
  {
    "search": "",
    "currentPage": 2,
    "totalPage": 3,
    "total": 6,
    "data": [
      {
        "id": 6,
        "name": "bebek carok",
        "description": "indonesian food from surabaya",
        "price": 40000,
        "imgUrl": "hdhdhduhdj.jpg",
        "categoryId": 1,
        "authorId": 2,
        "status": "Active",
        "createdAt": "2023-09-06T09:18:10.608Z",
        "updatedAt": "2023-09-06T09:18:10.608Z"
      }
    ]
  }
  ```

  &nbsp;

## 17. GET http://localhost:3000/public/bookmark

Description

Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": 2,
      "PubUserId": 1,
      "Cuisine": 6,
      "Cuisine": {
        "id": 6,
        "name": "bebek carok",
        "description": "indonesian food from surabaya",
        "price": 40000,
        "imgUrl": "hdhdhduhdj.jpg",
        "categoryId": 1,
        "authorId": 2,
        "status": "Active",
        "createdAt": "2023-09-06T09:18:10.608Z",
        "updatedAt": "2023-09-06T09:18:10.608Z"
      }
    }
  ]
  ```
  &nbsp;

## 18. POST http://localhost:3000/public/bookmark/:id

Description

- Create a new bookmark data

Response

_201 - Created_

- Body
  ```json
  {
    "id": 28,
    "PubUserId": 4,
    "CuisineId": 2,
    "updatedAt": "2023-08-24T11:49:46.876Z",
    "createdAt": "2023-08-24T11:49:46.876Z"
  }
  ```
  &nbsp;

## 19. DELETE http://localhost:3000/public/bookmark/:id

Description

- Delete a new bookmark data

Response

_200 - OK_

- Body
  ```json
  {
    "message": "Bookmark with id (28) deleted"
  }
  ```
