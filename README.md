# backend-store

# Requirements
 - Docker (Optional)
 - Node 18+
 - MariaDB

## Stack
- Express
- MariaDB

### Set environment variables in the following paths:
  Backend service running at port 5000
  - Copy .env.example to .env 
  ```
    MYSQL_ROOT_PASSWORD=
    MYSQL_DATABASE=
    MYSQL_USER=
    MYSQL_PASSWORD=
    JWT_SECRET=
  ```
## Run locally (Without Docker)
  ```
    ./run.sh
  ```
## Run locally with Docker (Recommended)
### startup application
  ```
  make run
  ```
### stop application
  ```
  make stop
  ```
### cleanup
  ```
  make clean
  ```
### API Docs
  http://localhost:5000/docs/