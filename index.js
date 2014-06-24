module.exports = function (options) {
  var db = options.db;
  // TODO error on missing db
  
  require('dbjs-ext/string/string-line/email')(db)

  return db.Object.extend("Person", {
    name: {
      type: db.String,
      required: true,
      context: "schema:name",
    },
    email: {
      type: db.Email,
      required: true,
      context: "schema:email",
    },
  });
};
