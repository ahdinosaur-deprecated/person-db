'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('people', function (t) {
    t.uuid('id').primary();
    t.json('name').notNullable();
    t.json('email').unique().notNullable();
    t.json('description').defaultTo("");
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('people');
};
