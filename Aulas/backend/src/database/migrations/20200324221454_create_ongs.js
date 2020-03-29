// O método up cria a tabela, o que acontence quando executar a migration
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        // O 2 limita o tamanho do texto
        table.string('uf', 2).notNullable();
    })
};

// Se der problema entra o método down, geralmente para deletar a tabela
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};
