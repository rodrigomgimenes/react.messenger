import React, { useState, useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'
import '../css/balloon.css'

// Screen to show the messages of each conversation
export default function OpenConversation() {
  const [text, setText] = useState('')
  const { sendMessage, selectedConversation } = useConversations()
  
  // Use a callback to scroll all the way to the bottom after sending a message
  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    sendMessage(
      selectedConversation.recipients.map(r => r.id),
      text.split(/\r?\n/)
    )
    setText('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message, index) => {
            const lastMessage = selectedConversation.messages.length - 1 === index
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`rounded px-2 py-1 ${message.fromMe ? (lastMessage ? 'text-white balloon balloon-right' : 'text-white') : (lastMessage ? 'border balloon balloon-left' : 'border')}`}
                  style={message.fromMe ? {backgroundColor: '#9795C6', borderColor: '#9795C6'} : {borderColor: '#9795C6'}} >
                  <InstantMessage message={message.text}/>
                </div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                  {/* {lastMessage ? `${(message.fromMe ? 'Me' : message.senderName)} - ${new Date().toLocaleTimeString('en-US')}` : null} */}
                  {lastMessage ? (message.fromMe ? 'Me' : message.senderName) : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e => setText(e.target.value)}
              style={{ height: '75px', resize: 'none' }}
            />
            <InputGroup.Append>
              <Button type="submit" style={{ backgroundColor: '#4f4e90', borderColor: '#4f4e90'}}>Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}

function InstantMessage({ message }) {
  return typeof message === 'string' ? { message } : message.map( messageLine => { return <div>{ messageLine }</div> })
}
