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
  }
};

module.exports = Mutations;
