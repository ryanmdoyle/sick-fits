// Starts up node server
// This is the entry point for the app, it needs all .env variables, the server, the db, all that good stuff
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db')

const server = createServer(); //make instance of GraphQL server from createServer.js

// Use express middleware to handle cookies`
// Use express middleware to populate current user

server.start({ //start the GraphQL server
  cors: { // only allow from frontend server (frontend_url)
    credentials: true,
    orgin: process.env.FRONTEND_URL,
  },
}, postStart => { //callback once connection is created
  console.log(`Server now running on http://localhost:${postStart.port}`);
});