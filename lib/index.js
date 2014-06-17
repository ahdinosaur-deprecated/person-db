var dulcimer = require('dulcimer');
var validator = require('validator');

module.exports = function (options) {
  return new dulcimer.Model({
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
};

module.exports.context = require('./context');
