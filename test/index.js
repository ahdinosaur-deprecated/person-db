var expect = require('chai').expect;
var DB = require('dbjs');
var _ = require('lodash');

var bob = {
  name: "Bob Loblaw",
  email: "bobloblaw@bobloblawslawblog.com",
};

var checkPerson = function (actual, expected) {
  expect(actual.id).to.exist;
  expect(actual.type).to.equal("Person");
  _.each(expected, function (value, key) {
    expect(actual).to.have.property(key, value);
  });
};

describe("#Person", function () {
  var knex = require('knex')(require('../knexfile').test);
  var bookshelf = require('bookshelf')(knex);
  var Person;

  beforeEach(function () {
    // TODO clear database
  });

  it("should load person model", function () {
    Person = require('../')(bookshelf);
  });
/*
  it("should CRUD person", function () {
    var fixture = _.clone(bob);
    // create 
    var person = db.Person(fixture);
    checkPerson(person, fixture);
    expect(person.object.master.constructor)
      .to.equal(db.Person);
    var id = person.__id__;
    expect(id).to.exist;
    // get
    var got = db.objects.getById(id);
    checkPerson(person, fixture);
    expect(got.object.master.constructor)
      .to.equal(db.Person);
    // update
    person.name = fixture.name = "Bob"
    checkPerson(person, fixture);
    // get
    var got2 = db.objects.getById(id);
    checkPerson(person, fixture);
    expect(got2.object.master.constructor)
      .to.equal(db.Person);
    // delete
    db.objects.delete(person)
    // get
    expect(db.objects.getById(id))
      .to.be.empty;
  });
*/
});

