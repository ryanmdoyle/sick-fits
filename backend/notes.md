# Prisma & GraphQL Yoga

## Creating Models & Interactions
1. Create a new Type in the dataModel and deploy to Prisma. This creates the new type and pulls down a new version of the prisma.graphql file that contains all the raw queries, mutations, and filters available.
2. Go into your own Schema (schema.graphql) and create the same type. This is the Yoga schema that the app will directly interface with. This is essentialls the models for the Query.js and Mutation.js files that act as the controllers for the application.
3. Go into the Query.js and Mutation.js and create the "resolvers." The resolvers are the logic in place that the app interfaces with, so that you can impliment logic and authentication and such. (Yoga is basically capturing all interactions, and doing things with the data, then communicates with the Prisma DB using it's methods created in the way you determine in the Yoga resolvers.)