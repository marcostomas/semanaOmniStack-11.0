const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development;

// cria a conecção com os parâmetros da conexão development
const connection = knex(config);

module.exports = connection;