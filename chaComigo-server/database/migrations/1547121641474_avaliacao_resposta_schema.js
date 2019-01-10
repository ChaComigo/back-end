'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvaliacaoRespostaSchema extends Schema {
  up () {
    this.create('avaliacao_respostas', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('avaliacao_respostas')
  }
}

module.exports = AvaliacaoRespostaSchema
