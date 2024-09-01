# Express MongoDB Profile Management Application

This is a simple Express.js application that demonstrates basic CRUD operations with MongoDB. It includes routes for serving an HTML file, handling image requests, fetching a user profile, and updating a user profile in a MongoDB database.

## Features

- **Serve Static HTML**: The application serves an `index.html` file at the root route (`/`).
- **Profile Picture Endpoint**: Provides an endpoint to serve a profile picture from the `images` directory.
- **Get User Profile**: Fetches a user's profile from the MongoDB database.
- **Update User Profile**: Allows updating a user's profile and upserts it into the MongoDB database if it does not exist.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed on your machine.
- MongoDB instance running locally or remotely.
- Basic knowledge of JavaScript, Node.js, and MongoDB.

## Getting Started

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
npm install express
```

### 3. Create docker network

```bash
docker network create mongo-network
```

### 4. start mongodb

```bash
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb --net mongo-network mongo
```

### 5. start mongo-express

```bash
docker run -d -p 8081:8081 -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin -e ME_CONFIG_MONGODB_ADMINPASSWORD=password --net mongo-network --name mongo-express -e ME_CONFIG_MONGODB_SERVER=mongodb mongo-express
```

### 6. open mongo-express from browser

```bash
http://localhost:8081
```

### 7. create user-account db and users collection in mongo-express

### 8. Start your nodejs application locally - go to app directory of project

```bash
node server.js
http://localhost:8880
```

With Docker Compose

### 1: start mongodb and mongo-express

```bash
docker-compose -f docker-compose.yaml up
```

### 2 You can access the mongo-express under localhost:8080 from your browser

```bash
=> in mongo-express UI - create a new database "user-account"
=> in mongo-express UI - create a new collection "users" in the database "user-account"
=> start node server
```
