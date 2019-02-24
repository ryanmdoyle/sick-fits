// Starts up node server
// This is the entry point for the app, it needs all .env variables, the server, the db, all that good stuff
require('dotenv').config({ path: 'variables.env' });
const cookieParser = require('cookie-parser');

const createServer = require('./createServer');
const server = createServer(); //make instance of GraphQL server from createServer.js

server.express.use(cookieParser());

// Use express middleware to populate current user

server.start({ //start the GraphQL server
  cors: { // only allow from frontend server (frontend_url)
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, postStart => { //callback once connection is created
  console.log(`Server now running on http://localhost:${postStart.port}`);
});