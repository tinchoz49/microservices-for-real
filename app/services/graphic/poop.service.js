'use strict'

/**
 * poop.service.js service
 */
module.exports = {
  name: 'poop',

  /**
   * Service settings
   */
  settings: {},

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
  actions: {
    /**
     * Test action
     */
    async do (ctx) {
      const end = Date.now() + 10000
      while (Date.now() < end) {
        // expensive and blocking operation
      }

      await ctx.call('message.create', {
        username: ctx.params.username,
        isPoop: true,
        createdAt: Date.now()
      })

      return true
    }
  },

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
