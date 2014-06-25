module.exports = function (options) {
  var db = options.db;
  // TODO error on missing db
  
  require('dbjs-ext/string/string-line/email')(db)

  return db.Object.extend("Person", {
    context: "schema:Person",
    id: {
      type: db.String,
      value: function () {
        return this.__valueId__;
      },
      context: "@id",
    },
    type: {
      type: db.String,
      value: function () {
        return "Person";
      },
      context: "@type",
    },
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
