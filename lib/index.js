var dulcimer = require('dulcimer');
var VeryType = require('verymodel').VeryType

module.exports = function (options) {

  options.name = options.name || 'people';

  var Person = new dulcimer.Model({
    id: {
      derive: function () { return this.key; },
      required: true,
      save: false,
    },
    type: {
      default: function () {
        return "Person";
      },
      required: true,
    },
    name: {
      type: "string",
    },
    email: {
      type: new VeryType().isEmail(),
    },
  }, options);

  Person.context = require('./context');
  Person.type = require('./type');

  return Person;
};
