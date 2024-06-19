# Slidely AI Desktop Application Backend

This repository contains the backend code for the Slidely AI Desktop Application. The backend is built using TypeScript and Node.js, and it provides various API endpoints for managing submissions, including creating, reading, updating, and deleting records. This backend also includes a basic search functionality.

## Table of Contents

- [Summary](#summary)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)

## Summary

The backend of the Slidely AI Desktop Application serves as the core server, handling all the necessary data operations. It utilizes a simple JSON file (`db.json`) for data storage and provides a RESTful API to interact with the data.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Karma-1710/Slidely-AI-Task2-Backend.git
2. **Navigate to the Backend Directory:**

   ```bash
   cd Slidely-AI-Task2-Backend
3. **Install the dependencies:**

   ```bash
   npm install

### Running the Server

1. **Start the server:**

   ```bash
   npx ts-node src/index.ts

The server will start running at http://localhost:3000.

### API Endpoints

The backend provides the following API endpoints:

1. GET /: Returns a "Hello" message.
2. GET /ping: Returns true to check the server status.
3. POST /submit: Submits a new entry.
4. GET /read: Reads a specific entry by index.
5. DELETE /delete: Deletes a specific entry by index.
6. GET /readAll: Reads all entries.
7. PUT /update: Updates a specific entry by index.
8. GET /search: Searches for an entry by email.

Note: This Backend Server is for Development purposes and uses a simple JSON file for data storage made for Task 2 of Slidely AI Company.
