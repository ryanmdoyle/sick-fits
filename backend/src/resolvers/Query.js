// This is where the DB queries go!
// Sets up public facing GraphQL yoga queries to communicate with Prisma 
const { forwardTo } = require('prisma-binding');

const Query = {
  // If a yoga query is the exact same as the prisma db, you can forward it. Useful is no auth, etc is needed.
  items: forwardTo('db')
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
};

module.exports = Query;
