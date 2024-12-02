<div align=center>

<picture>
    <source srcset="django-logo.png">
    <img alt="Laravel" width="310" height="340">
</picture>

# <a name="no-link"></a>Goblin Mine Game API

### Laravel API for the Goblin Mine Game app. Database agnostic but I've used PostgreSQL.

</div>
&nbsp;&nbsp;&nbsp;&nbsp;

## <a name="no-link"></a>Technologies Used

- **Laravel**

Laravel is a high-level PHP web framework designed for building modern and scalable web applications. It follows the Model-View-Controller (MVC) architectural pattern and supports features like routing, authentication, and database migrations. This makes it a strong choice for building secure and efficient web applications.

- **PostgreSQL**

PostgreSQL is a RDBMS known for its reliability, robust feature set, and extensibility. It is highly regarded for its ability to handle complex queries, manage high concurrency, and provide advanced data types and indexing capabilities. 

## How to install

Set the environment variables

```
DB_CONNECTION=YOUR_DB_CONNECTION
DB_HOST=YOUR_DB_HOST
DB_PORT=YOUR_DB_PORT
DB_DATABASE=YOUR_DB
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
SSLMODE=require
```

Install dependencies and run

```
composer install
php artisan serve
```

## Entities

All IDs are UUIDv4.

### 1. **Bomb**
- id (PK)
- bombs
- multiplier

## Example endpoint

**Create**

```POST /bombs```

```
{
    "bombs": 10,
    "multiplier": 1.90,
    "payoff": 19000
}
```

Returns

```
201 CREATED

{
    "id": "9d9f867b-32ff-4d0c-aed9-f62463e25063",
    "bombs": 10,
    "multiplier": 1.9,
    "payoff": 19000,
    "updated_at": "2024-12-01T20:26:55.000000Z",
    "created_at": "2024-12-01T20:26:55.000000Z"
}
```
**Read**

```GET /bombs```

Returns

```
200 OK

[
    {
        "id": "9d9b631a-bf7b-427a-ab17-58ee98e4ffbb",
        "bombs": 1,
        "multiplier": "1.08",
        "payoff": 10800,
        "created_at": "2024-11-29T19:04:41.000000Z",
        "updated_at": "2024-11-29T19:04:41.000000Z"
    },
    {
        "id": "9d9f867b-32ff-4d0c-aed9-f62463e25063",
        "bombs": 10,
        "multiplier": "1.9",
        "payoff": 19000,
        "created_at": "2024-12-01T20:26:55.000000Z",
        "updated_at": "2024-12-01T20:26:55.000000Z"
    },
]
```

```GET /bombs/{id}``` &nbsp;
**id: unique identifier in UUIDv4 format**

Returns

```
200 OK

{
    "id": "9d9f867b-32ff-4d0c-aed9-f62463e25063",
    "bombs": 10,
    "multiplier": "1.9",
    "payoff": 19000,
    "created_at": "2024-12-01T20:26:55.000000Z",
    "updated_at": "2024-12-01T20:26:55.000000Z"
}
```

**Update**

```PATCH /bombs/{id}```

```
{
    "id": "9d9f867b-32ff-4d0c-aed9-f62463e25063",
    "bombs": 2
}
```

Returns
```
200 OK

{
    "id": "9d9f867b-32ff-4d0c-aed9-f62463e25063",
    "bombs": 2,
    "multiplier": "1.9",
    "payoff": 19000,
    "created_at": "2024-12-01T20:26:55.000000Z",
    "updated_at": "2024-12-01T20:35:17.000000Z"
}
```

**Delete**

```DELETE /genres/{id}```

Returns

```
200 OK

{
    "message": "Deleted bomb with id 9d9f867b-32ff-4d0c-aed9-f62463e25063"
}
```

# API hosted on Vercel

https://goblin-mine-game-api.vercel.app/
