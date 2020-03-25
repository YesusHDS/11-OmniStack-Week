
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table){
    //   atributos da tabela
      table.string('id').primary() // primary() constraint para definir pk
      table.string('name').notNullable() // notNullable() constraint notNull
      table.string('email').notNullable()
      table.string('whatsapp').notNullable()
      table.string('city').notNullable()
      table.string('UF', 2).notNullable() // é possível por quantidade de caracteres após o nome do atributo
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs')
};
