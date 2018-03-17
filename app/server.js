const fastify = require('fastify')({
  logger: true
})
const fp = require('fastify-plugin')
const { ServiceBroker } = require('moleculer')

const moleculer = fp(function (fastify, opts) {
  let broker = new ServiceBroker({
    logger: console,
    transporter: 'NATS'
  })

  broker.createService({
    name: 'fastify'
  })

  fastify.decorate('call', (...args) => broker.call(...args))

  return broker.start()
})

fastify.register(moleculer)

// Declare a route
fastify.get('/', async (request, reply) => {
  return fastify.call('message.list')
})
// Run the server!
fastify.listen(3001, err => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
