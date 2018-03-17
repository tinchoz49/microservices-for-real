'use strict'
/* eslint-env jest */

const { ServiceBroker } = require('moleculer')
const TestService = require('../../services/db/message.service')

describe("Test 'message' service", () => {
  let broker = new ServiceBroker()
  broker.createService(TestService)

  beforeAll(() => broker.start())
  afterAll(() => broker.stop())

  describe("Test 'message.create' action", () => {
    it('should return a new message', async () => {
      const message = await broker.call('message.create', {
        username: 'test',
        value: 'test'
      })

      expect(message).not.toBeNull()
    })
  })
})
