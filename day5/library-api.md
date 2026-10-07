# Library Books REST API

This API manages a library's **books** resource. The examples use `/api/books` as the base path.

## Endpoints

### 1. List books

- **Method:** `GET`
- **Path:** `/api/books`
- **Description:** Returns a list of all books in the library.
- **Success status:** `200 OK`

**Example request:**

```http
GET /api/books
```

### 2. Get one book

- **Method:** `GET`
- **Path:** `/api/books/{id}`
- **Description:** Returns the details of one book identified by its ID.
- **Success status:** `200 OK`

**Example request:**

```http
GET /api/books/42
```

### 3. Create a book

- **Method:** `POST`
- **Path:** `/api/books`
- **Description:** Creates a new book using the supplied book details.
- **Success status:** `201 Created`

**Example request body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "isbn": "9780385474542",
  "publishedYear": 1958
}
```

### 4. Update a book

- **Method:** `PUT`
- **Path:** `/api/books/{id}`
- **Description:** Replaces the details of an existing book.
- **Success status:** `200 OK`

**Example request body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "isbn": "9780385474542",
  "publishedYear": 1958
}
```

### 5. Delete a book

- **Method:** `DELETE`
- **Path:** `/api/books/{id}`
- **Description:** Deletes an existing book from the library.
- **Success status:** `204 No Content`

**Example request:**

```http
DELETE /api/books/42
```

### 6. List books by author

- **Method:** `GET`
- **Path:** `/api/books?author={author}`
- **Description:** Returns books whose author matches the supplied query parameter.
- **Success status:** `200 OK`

**Example request:**

```http
GET /api/books?author=Chinua%20Achebe
```

## Error Codes

- **400 Bad Request:** The request is invalid, such as creating a book without a required `title` or `author` field.
- **404 Not Found:** The requested book does not exist, such as requesting `GET /api/books/9999` when book `9999` is not in the library.
