// this is where your db mutations go!
/*
You can access the Prisma db from the context (set in createServer.js).
Alternatively, it could be imported to this file.
Sets up public facing GraphQL yoga queries to communicate with Prisma
*/
const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem({
      data: {
        ...args //spread operator makes variables for all the arguments
      }
    }, info)
    return item; //the methods are Promises, so make async/await and return
  },
  updateItem(parent, args, ctx, info) {
    // Makes copy of updates.  You don't want to update the ID with the mutation, but you need to reference it later.
    const updates = {...args};
    // remove ID from the updates object so 'updates' is only the actual updates to the db reference
    delete updates.id;
    // run update method (the updateItem method within the Prisma API generated in prisma.graphql) using the new updates object, where the id matches the original id
    return ctx.db.mutation.updateItem({
      data: updates, 
      where: {
        id: args.id,
      }
    }, info)
  }
};

module.exports = Mutations;
