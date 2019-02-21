# Notes!
These are general notes taken throughout the project to summarize learnings and come back to if needed.
***

## React, Apollo, GraphQL, & Prisma

- ### React (Front)
  All the alient side normal front-end business. Without state, because that's handled through Apollo and the db.

- ### Apollo _Client_(Front)
  Apollo _Client_ is the client end of Apollo. (There is also Apollo server, but we are using Yoga) Apollo Client exposes a number of React Components that expose the Graph QL Mutations and Queries.
  1. The Apollo Client works by wrapping components within query or mutation components, for example `<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>[Things in here that would mutate, like a form.]</Mutation>`.  These components accept a query or mutation object (depending on what it is) as well as variables. __These components always have 1 child, which is a render function.__
  2. The query/mutation passed into the components are actual GraphQL queries, whcih get wrapped in a gql function like below.  The gql is actually calling the db method 'createItem' from Prisma within, passing it the variables (starts with $) and returning the item id.
    ```
    const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
      $title: String!
      $description: String!
      $price: Int!
      $image: String
      $largeImage: String
    ) {
      createItem(
        title: $title
        description: $description
        price: $price
        image: $image
        largeImage: $largeImage
      ) {
        id
      }
    }
    `;
    ```
    - ___Querys:___ A Query component gets passed a query gql function. Within the query component, there is 1 render method. [It exposes the error, loading and data on a result object that is passed into the render prop function.](https://www.apollographql.com/docs/tutorial/queries.html#fetch-data).
    ```
    <Query query={GET_LAUNCHES}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <p>ERROR</p>;
        return (
          STUFF HERE
        );
      }}
    </Query>
    ```
    - ___Mutations:___ Updating data with a Mutation component from react-apollo is very similar to fetching data with a Query component. The main difference is that the first argument to the Mutation render prop function is a mutate function that actually triggers the mutation when it is called. In the example below _LOGIN_USER_ if the gql function that is created.  In the Mutation render prop, the function 'login' is used to trigger that LOGIN_USER mutation that's created in the gql function.
    ```
    export default function Login() {
      return (
        <Mutation mutation={LOGIN_USER}>
          {(login, { data }) => <LoginForm login={login} />}
        </Mutation>
      );
    }
    ```
  

- ### GraphQL Yoga (Back)
  GraphQL Yoga is and Express based GraphQL server made by Prisma, and sits on top of the Prisma DB, allowing logic with the CRUD operations using the GraphQL spec.  It's compatible with Apollo. It's like the create-react-app of graphQL servers.
  1. The backend server IS a Yoga server (opposed to vanilla express).
  2. When starting the server, you pass it:
      - __TypeDefs__: the __schema.graphql__ to tell it what the types are (you can also import all the Prisma created ones from _prisma.graphql_), along with the resolvers.
      - __Resolvers__: These files (Queries.js and Mutation.js) contain all the logic based DB queries and mutations that you will call using the client-side code (Apollo). Within the resolvers, you can call the Prisma created methods to actually make the DB changes within your own logic.  (Adding something IF you're logged in, etc.) See context for how these see the DB.
      - __Context__:  This context tells the server what information to pass along (as an object) through the resolvers chain.  If you have `context: req => ({ ...req, db })` you are telling the server to pass along the original request along with the db information _(created in db.js)_. 
  3. __Passing along the db in context allows the queris and mutations you write to access the Prisma CRUD methods.__  It does this because in db.js, you tell it to create a new Prisma DB with the `typeDefs: 'src/generated/prisma.graphql'` (created from prisma) and the db gets returned along with the original req as the "context" of Prisma server.
      - In the queries and mutations, you access these by `ctx.db.[query or mutation].[CRUD Prisma methodfound in prisma.graphql]`


- ### Prisma (Back)
  Prisma is essentially a layer that sits on top of your database and provides you with CRUD operations for all of your data types.
  1. Prisma makes the CRUD methods using the _datamodel.graphql_ file.  This must be deployed to Prisma, and then a _prisma.graphql_ file is generated which contains all of the neccessary methods for CRUD operations.
  2. There is NO logic! The crud operations are straight up for writing, deleting, etc. To use any logic, we use __GraphQL Yoga__.
  3. Yoga (made by Prisma) gives all logic to Prisma.
