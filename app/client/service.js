import io from 'socket.io-client'
import fetch from 'unfetch'

export default onmessage => {
  const username = window.prompt('Nombre de usuario', 'Harry Potter')

  if (!username) {
    return
  }

  const socket = io({
    query: {
      username
    }
  })

  socket.on('new-message', onmessage)

  return {
    getMessages () {
      return fetch('api/messages?sort=createdAt').then(r => r.json())
    },
    send (value) {
      socket.emit('new-message', value)
    },
    doPoop () {
      return fetch('api/poop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      })
    }
  }
}
