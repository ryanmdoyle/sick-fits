# Prisma & GraphQL Yoga

## Models & Interactions

### Create Types in Prisms
1. Create a new Type in the datamodel.graphql.  This is creating a Schema that Prisma uses in it's DB.
2. Deploy to Prisma. This creates the new type in Prisma and pulls down a new version of the prisma.graphql file. That file contains all the raw queries, mutations, and filters available for Prisma.

### Making your Schema in Yoga
1. Go into your own Schema (schema.graphql) and create the same type as you made in Prisma. This is the Yoga schema that the app will directly interface with. This is essentially the model(s) for the Query.js and Mutation.js files that act as the controllers for the application.
2. For these schemas you make, you must create "resolvers" which are either queries or mutations
3. Go into the Query.js and Mutation.js and create the "resolvers." The resolvers are the logic in place that the app interfaces with, so that you can impliment logic and authentication and such. These queries and mutations use the _Prisma Queries/Mutations_ that are already created by Prisma and returned in the _prisma.graphql_ file.
4. Yoga is basically capturing all interactions, and doing things with the data, then communicates with the Prisma DB using it's methods created in the way you determine in the Yoga resolvers.