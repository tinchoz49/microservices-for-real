const zipkinService = require('moleculer-zipkin')

module.exports = {
  name: 'zipkin',
  mixins: [zipkinService]
}

// docker run -d -p6832:6832/udp -p16686:16686 jaegertracing/all-in-one:latest
