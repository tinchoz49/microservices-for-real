'use strict'
const dbService = require('moleculer-db')

/**
 * user service
 */
module.exports = {
  name: 'user',

  mixins: [dbService],

  /**
   * Service settings
   */
  settings: {
    fields: ['_id', 'username', 'connected']
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
  actions: {
    connect: {
      params: {
        username: { type: 'string' }
      },
      async handler (ctx) {
        const { username } = ctx.params

        let user = await this.adapter.findOne({ username })

        if (user && user.connected) {
          return null
        }

        if (user) {
          user = await this.adapter.updateById(user._id, { connected: true })
        } else {
          user = await this.adapter.insert({ username, connected: true })
        }

        this.logger.info(user, 'User connected')

        return user
      }
    },
    disconnect: {
      params: {
        userId: { type: 'string' }
      },
      async handler (ctx) {
        const { userId } = ctx.params

        await this.adapter.updateById(userId, { connected: false })

        this.logger.info({ _id: userId }, 'User disconnected')
      }
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
