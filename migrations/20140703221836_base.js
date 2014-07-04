'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('people', function (t) {
    t.increments('id').primary();
    t.string('name', 100);
    t.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('people');
};
