'use strict'

/**
 * email service
 */
module.exports = {
  name: 'email',

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
    async send (ctx) {
      await this.sendEmail()
      this.logger.info(ctx.params.message, 'email-sended')
    }
  },

  /**
   * Events
   */
  events: {},

  /**
   * Methods
   */
  methods: {
    sendEmail (data) {
      return new Promise(resolve => setTimeout(resolve, 5000))
    }
  },

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
