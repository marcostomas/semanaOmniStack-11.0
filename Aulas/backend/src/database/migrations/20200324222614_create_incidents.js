
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table){
        // Auto Incrementa o id
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        // Modelo Relacionamento | Chave Primária
        table.string('ong_id').notNullable();

        // Referenciando a Chave Estrangeira Foreign key
        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
