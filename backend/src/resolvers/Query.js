// This is where the DB queries go!
// Sets up public facing GraphQL yoga queries to communicate with Prisma 
const { forwardTo } = require('prisma-binding');

const Query = {
  // If a yoga query is the exact same as the prisma db query you can just "forward" it. Useful if no auth, etc is needed.
  items: forwardTo('db'),
  item: forwardTo('db'),
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
};

module.exports = Query;
