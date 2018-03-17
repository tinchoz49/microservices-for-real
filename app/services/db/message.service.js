'use strict'
const dbService = require('moleculer-db')

/**
 * message service
 */
module.exports = {
  name: 'message',

  mixins: [dbService],

  /**
   * Service settings
   */
  settings: {
    fields: ['_id', 'username', 'value', 'isPoop', 'createdAt']
  },

  entityCreated (json, ctx) {
    ctx.emit('message.new-message', json)
  },

  /**
   * Service metadata
   */
  metadata: {},

  /**
   * Service dependencies
   */
  // dependencies: [],

  /**
   * Actions
   */
  actions: {},

  /**
   * Events
   */
  events: {},

  /**
   * Methods
   */
  methods: {},

  /**
   * Service created lifecycle event handler
   */
  created () {},

  /**
   * Service started lifecycle event handler
   */
  started () {},

  /**
   * Service stopped lifecycle event handler
   */
  stopped () {}
}
