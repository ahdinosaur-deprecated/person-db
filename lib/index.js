var dulcimer = require('dulcimer');
var validator = require('validator');

module.exports = function (options) {
  var Person = new dulcimer.Model({
    name: {
      type: "string",
    },
    email: {
      type: "email",
      validation: function (value) {
        return validator.isEmail(value);
      },
    },
  }, options);

  Person.context = require('./context');
  Person.type = require('./type');

  return Person;
};
