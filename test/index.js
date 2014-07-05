var expect = require('chai').expect;
var DB = require('dbjs');
var _ = require('lodash');

var bob = {
  name: "Bob Loblaw",
  email: "bobloblaw@bobloblawslawblog.com",
};

var checkPerson = function (actual, expected) {
  expect(actual.id).to.exist;
  //expect(actual.type).to.equal("Person");
  _.each(expected, function (value, key) {
    expect(actual).to.have.property(key, value);
  });
};

describe("#Person", function () {
  var knex = require('knex')(require('../knexfile').test);
  var bookshelf = require('bookshelf')(knex);
  var Person;

  beforeEach(function () {
    return knex('people').del();
  });

  it("should load person model", function () {
    Person = require('../')(bookshelf);
  });

  it("should CRUD person", function () {
    var fixture = _.clone(bob);
    // create 
    var person = new Person(fixture);
    var id;
    // check new person
    expect(person.toJSON()).to.deep.equal(fixture);
    return person.save()
    .then(function (savedPerson) {
      id = person.id;
      // check saved person
      checkPerson(savedPerson.toJSON(), fixture);
    })
    .then(function () {
      // get person from db
      return new Person({ id: id }).fetch()
    })
    .then(function (fetchedPerson) {
      // check fetched person
      checkPerson(fetchedPerson.toJSON(), fixture);
    })
    .then(function () {
      // update person in db
      fixture.name = 'Bob';
      person.set('name', 'Bob');
      return person.save();
    })
    .then(function (updatedPerson) {
      // check updated person
      checkPerson(updatedPerson.toJSON(), fixture);
    })
    .then(function () {
      // delete person in db
      return person.destroy();
    })
    .then(function (destroyedPerson) {
      expect(destroyedPerson.id).to.not.exist;
      expect(destroyedPerson.toJSON()).to.be.empty;
    })
    .then(function () {
      // get destroyed person from db
      console.log(id);
      return new Person({ id: id }).fetch()
    })
    .then(function (destroyedPerson) {
      expect(destroyedPerson).to.not.exist;
    })
    ;
  });
});

