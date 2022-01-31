# Dataviewing dashboard in Svelte

## Description

Dataviewer Web App made using:

Frontend:
- Svelte
- Tailwind
- Axio
- Svelte-spa-router
- chart.js

Backend: 
- Node.js
- Express
- Mongoose


And:
- MongoDB


## Development setup
 1. run a mongodb server (Either via the docker compose file up normally)
 2. install the required packages via npm/yarn etc.
 3. using npm run the dev function on the frontend
 4. using npm run the watch-run function on the backend
 5. visit the localhost url given by the dev function

## Installation

Docker:
 1. Open a terminal
 2. CD into the root of this project
 3. Edit the docker-compose.yml to change ports if required etc
 4. Edit the "Frontend/src/Services/Api.js" baseurl to point to the address of the Backend Service
 5. Edit the "Backend/src/DB/DBS/MongooseDB.ts" to point to the address of the Mongoose Service
 6. Use "Docker-compose up -d" to start the services
 7. Access the Dashboard by going to port 5000 (default) of the Frontend Service
