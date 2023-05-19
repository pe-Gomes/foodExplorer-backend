exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments('id')
    table.integer('user_id').references('id').inTable('users')
    table.string('title').notNullable()
    table.string('description')
    table.integer('price').notNullable()

    table.datetime('created_at').defaultTo(knex.fn.now())
    table.datetime('updated_at').defaultTo(knex.fn.now())
  })

exports.down = (knex) => knex.schema.dropTable('products')
