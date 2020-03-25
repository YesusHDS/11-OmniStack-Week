const knex = require('knex') //importa o knex
const configuration = require('../../knexfile.js') // importa as configs do banco disponíveis na pasta do knex

const connection = knex(configuration.development)

module.exports = connection