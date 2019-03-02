// this is where your db mutations go!
/*
You can access the Prisma db from the context (set in createServer.js).
Alternatively, it could be imported to this file.
Sets up public facing GraphQL yoga queries to communicate with Prisma
*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const updates = { ...args };
    // remove ID from the updates object so 'updates' is only the actual updates to the db reference
    delete updates.id;
    // run update method (the updateItem method within the Prisma API generated in prisma.graphql) using the new updates object, where the id matches the original id
    return ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id,
      }
    }, info)
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    //find item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    //check ownership of item or persmission to delete
    // //todo
    //delete item
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: {
        name: args.name,
        email: args.email,
        password: password,
        permissions: { set: ['USER'] }
      }
    }, info)
    // create JWT token to auto login after signup and set cookie to pass to future requests
    // accepts the user id, and then a "secret" that's app/site specific
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 31,
    });

    //return user to browser
    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: email } });
    if (!user) {
      throw new Error(`No such iser found for the email ${email}`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error(`password is not valid!`);
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 31,
    });
    return user;
  },
};

module.exports = Mutations;
