'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvaliacaoSchema extends Schema {
  up () {
    this.create('avaliacaos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('avaliacaos')
  }
}

module.exports = AvaliacaoSchema
