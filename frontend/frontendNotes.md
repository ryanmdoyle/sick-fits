# Frontend Notes

## Apollo Client
Apollo client is essentially used to connect to the yoga server.
1. You create an Apollo client first (withData.js)
2. The withData takes the withApollo (next-with-apollo for server side renders) and takes the client.
3. The app (_app.js) is passed into the withData function, which is the withApollo func, using the apollo client.
4. Inside the _app, you wrap the Page components in the ApolloProvider and pass all the page props as a descructured object so you can access all the data that Apollo gets (from the yoga server, which uses GraphQL to query the Prisma server 🤯).

## Updating Items with Queries and Mutations in Pages
1. First, you must write/use a query and everything needs to be wrapped in that so that it's exposed to the data that the query is returning.
2. Inside of the query component is the mutation component (nested so it can mutate what is has access to from the query)
- In React you can set _defaultVal_ on form inputs which don't place a value into state (like _value_).You ccan use this to input data from the db into the form initially before you change it.