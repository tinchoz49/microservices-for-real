/** @jsx h */
import { h, render, Component } from 'preact'
import linkState from 'linkstate'
import 'bulma'
import poop from './poop.png'
import createService from './service'

const ENTER_KEY = 13

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      messages: [],
      value: ''
    }
    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.handlePoop = this.handlePoop.bind(this)
  }

  componentDidMount () {
    const { send, getMessages, doPoop } = createService(msg => {
      this.setState({
        messages: [...this.state.messages, msg]
      })
    })

    this.send = send
    this.doPoop = doPoop

    getMessages().then(result => {
      this.setState({ messages: result.rows }, () => {
        this.scrollToBottom()
      })
    })
  }

  componentDidUpdate () {
    this.scrollToBottom()
  }

  scrollToBottom () {
    const nodes = this.divMessages.children

    if (!this.cantNodes) {
      this.cantNodes = 0
    }

    if (this.cantNodes === nodes.length) {
      return
    }
    this.cantNodes = nodes.length
    nodes[nodes.length - 1].scrollIntoView({ behavior: 'smooth' })
  }

  handleSendMessage (e) {
    if (e.keyCode && e.keyCode !== ENTER_KEY) return
    e.preventDefault()

    const { value } = this.state
    if (!value || value.length === 0) return
    this.send(value)
    this.setState({ value: '' })
  }

  handlePoop () {
    this.doPoop()
  }

  render () {
    return (
      <div class='container' style={{ padding: 10 }}>
        <article class='message is-medium is-danger'>
          <div class='message-header'>
            <p>El chat re loco!</p>
          </div>
          <div
            class='message-body'
            style={{
              color: 'none',
              height: '80vh',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              class='chat-conversation'
              style={{ overflow: 'auto', marginBottom: 30, flex: 1 }}
              ref={div => {
                this.divMessages = div
              }}
            >
              {this.state.messages.map(msg => (
                <article class='message is-info'>
                  <div class='message-body'>
                    <strong>{msg.username}: </strong>
                    {msg.isPoop ? (
                      <img src={poop} class='image' width={48} />
                    ) : (
                      msg.value
                    )}
                  </div>
                </article>
              ))}
            </div>
            <hr />
            <div class='new-message'>
              <div class='field has-addons' style={{ alignItems: 'center' }}>
                <div class='control' style={{ width: '100%' }}>
                  <textarea
                    class='textarea'
                    placeholder='Mensaje...'
                    rows={1}
                    style={{ resize: 'none' }}
                    onKeyDown={this.handleSendMessage}
                    onInput={linkState(this, 'value')}
                    autoFocus
                    value={this.state.value}
                  />
                </div>
                <div class='control' style={{ display: 'flex' }}>
                  <a
                    class='button is-info is-medium'
                    onclick={this.handleSendMessage}
                  >
                    <span class='icon'>
                      <i class='fa fa-paper-plane' aria-hidden='true' />
                    </span>
                  </a>
                  <a
                    class='button is-warning is-medium'
                    onclick={this.handlePoop}
                  >
                    <img src={poop} class='image' width={48} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

const root = document.getElementById('root')
render(<App />, root, root.lastElementChild)
