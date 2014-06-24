var expect = require('chai').expect;
var DB = require('dbjs');
var _ = require('lodash');

var bob = {
  name: "Bob Loblaw",
  email: "bobloblaw@bobloblawslawblog.com",
};

describe("#Person", function () {
  var db;

  beforeEach(function () {
    db = DB();

    require('../')({
      db: db,
    });
  });

  it("should CRUD person", function () {
    var fixture = _.clone(bob);
    // create 
    var person = db.Person(fixture);
    expect(person).to.deep.equal(fixture);
    expect(person.object.master.constructor)
      .to.equal(db.Person);
    var id = person.__id__;
    expect(id).to.exist;
    // get
    var got = db.objects.getById(id);
    expect(got).to.deep.equal(fixture);
    expect(got.object.master.constructor)
      .to.equal(db.Person);
    // update
    person.name = fixture.name = "Bob"
    expect(person).to.deep.equal(fixture);
    // get
    var got2 = db.objects.getById(id);
    expect(got2).to.deep.equal(fixture);
    expect(got2.object.master.constructor)
      .to.equal(db.Person);
    // delete
    db.objects.delete(person)
    // get
    expect(db.objects.getById(id))
      .to.be.empty;
  });
});

