'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FatorSchema extends Schema {
  up () {
    this.create('fators', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('fators')
  }
}

module.exports = FatorSchema
