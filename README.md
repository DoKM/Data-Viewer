# Dataviewing dashboard in Svelte

## Description

Dataviewer Web App made usingl:

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


## Installation

Docker:
 1. Open a terminal
 2. CD into the root of this project
 3. Edit the docker-compose.yml to change ports if required etc
 4. Edit the "Frontend/src/Services/Api.js" baseurl to point to the address of the Backend Service
 5. Edit the "Backend/src/DB/DBS/MongooseDB.ts" to point to the address of the Mongoose Service
 6. Use "Docker-compose up -d" to start the services
 7. Access the Dashboard by going to port 5000 (default) of the Frontend Service
