exports.up = (knex) =>
  knex.schema.alterTable('products', (table) => {
    table.string('image')
  })

exports.down = (knex) =>
  knex.schema.alterTable('products', (table) => {
    table.dropColumn('image')
  })
