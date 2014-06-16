var expect = require('chai').expect;
var level = require('level');
var db = level('testdb', {valueEncoding: 'json'});

var PersonDomain = require('../')({
  db: db,
  name: "person",
});

describe("#Person", function () {
  it("should CRUD person model", function (done) {
    var newPerson = PersonDomain.create({
      name: "Bob Loblaw",
      email: "bobloblawlawblog.com",
    });
    newPerson.save(function (err) {
      expect(err).to.not.exist;
      var key = newPerson.key;
      expect(key).to.exist;
      PersonDomain.get(key, function (err, getPerson) {
        expect(err).to.not.exist;
        expect(getPerson.toJSON()).to.deep.equal(newPerson.toJSON());
        PersonDomain.update(key, { name: "Bob" }, function (err, updatePerson) {
          expect(err).to.not.exist;
          expect(updatePerson.toJSON()).to.deep.equal({
            name: "Bob",
            email: newPerson.email,
          });
          done();
        });
      });
    });
  });
  
  afterEach(function (done) {
    // del all objects in db
    db.createKeyStream()
    .on('data', function (k) {
      db.del(k);
    })
    .on('close', function () {
      done();
    });
  });
});

