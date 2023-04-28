exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id");
  table.boolean("admin").defaultTo(false);
  table.string("name").notNullable();
  table.string("email").notNullable();
  table.string("password").notNullable();
  table.timestamp("created_at").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");
