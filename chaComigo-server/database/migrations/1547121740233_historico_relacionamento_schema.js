'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistoricoRelacionamentoSchema extends Schema {
  up () {
    this.create('historico_relacionamentos', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('historico_relacionamentos')
  }
}

module.exports = HistoricoRelacionamentoSchema
