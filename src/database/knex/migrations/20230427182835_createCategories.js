exports.up = knex => knex.schema.createTable("categories", table => {
  table.increments("id");
  table.integer("product_id").references("id").inTable("products").onDelete("CASCADE");
  table.string("name").notNullable();
});

exports.down = knex => knex.schema.dropTable("categories");
