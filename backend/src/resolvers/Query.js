// This is where the DB queries go!

const Query = {
  dogs(parent, args, ctx, info) {
    global.dogs = global.dogs || []
    return global.dogs
  }
};

module.exports = Query;
