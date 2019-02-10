//This file connects to the Prisma DB and allow connecting to it via the prisma.graphql queries

const { Prisma } = require('prisma-binding');

// The prisma.graphql file is pulled/created post-deploy to allow for the GraphQL Yoga to use the queries/mutations Prisma made
const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

module.exports = db;