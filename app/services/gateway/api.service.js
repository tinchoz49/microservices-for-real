'use strict'

const ApiGateway = require('moleculer-web')

module.exports = {
  name: 'api',
  mixins: [ApiGateway],

  // More info about settings: http://moleculer.services/docs/moleculer-web.html
  settings: {
    port: process.env.PORT || 3000,

    routes: [
      {
        path: '/api',
        mappingPolicy: 'restrict',
        aliases: {
          'GET messages': 'message.list',
          'POST poop': 'poop.do'
        }
      }
    ],

    // Serve assets from "public" folder
    assets: {
      folder: 'dist'
    }
  },

  events: {
    'message.new-message' (message) {
      this.io.emit('new-message', message)
      this.broker.call('email.send', { message })
    }
  },

  started () {
    this.io = require('socket.io')(this.server)

    this.users = {}

    this.io.use(async (socket, next) => {
      const username = socket.handshake.query.username
      const user = await this.broker.call('user.connect', { username })

      if (user) {
        this.users[username] = user
        return next()
      }

      return next(new Error('authentication error'))
    })

    this.io.on('connection', socket => {
      const user = this.users[socket.handshake.query.username]

      socket.on('disconnect', async () => {
        await this.broker.call('user.disconnect', { userId: user._id })
      })

      socket.on('new-message', async value => {
        await this.broker.call('message.create', {
          username: user.username,
          value,
          createdAt: Date.now()
        })
      })
    })
  }
}
