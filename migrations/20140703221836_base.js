'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('people', function (t) {
    t.uuid('id').primary().notNull();
    t.json('type').defaultTo("Person");
    t.json('name').notNull();
    t.json('email').unique().notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('people');
};
