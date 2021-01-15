import React from 'react'
import { ListGroup, Badge } from 'react-bootstrap'
import { ChatLeftTextFill } from 'react-bootstrap-icons'
import Avatar from 'react-avatar';
import { useConversations } from '../contexts/ConversationsProvider'

import UserAvatar from '../assets/avatar.png'

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations()
  console.log("conversations = ", conversations);

  return (
    <ListGroup variant="flush">
      {conversations.map((conversation, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
          style={conversation.selected ? {backgroundColor: '#7B7AB8', borderColor: '#7B7AB8'} : null}
        >
          {conversation.recipients.map(recipient => {
            return (
              <>
                <Avatar 
                  className="mr-2" 
                  color={'#7B7AB8'}
                  textSizeRatio={1.75} 
                  size={40} 
                  round={true}  
                  name={recipient.name} 
                  src={conversation.selected ? UserAvatar : null}
                  key={recipient.id}
                />
                {recipient.name}
              </>
            )}
          )}

          {conversation.messages.map((message, index) => {
            // Verify if Last message 
            if (conversation.messages.length - 1 === index) {
              return (
                <>
                  <Badge className={`float-right ${!message.fromMe && !message.hasRead ? '': 'invisible'}`}>
                    <ChatLeftTextFill style={conversation.selected ? {color: '#FBF6F0'} : {color: '#52057B'}} />
                  </Badge>
                  <span className="d-flex flex-column mr-4 ml-5 text-muted small">
                    <em style={!conversation.selected ? null : {color: '#FBF6F0'}}>
                      {
                        typeof message.text === 'string' ? (
                          message.text.length > 20 ? `${message.text.substring(0, 20)}...` : (
                            message.text.length > 0 ? message.text : ''
                          )
                        ) :
                        (
                          message.text[0].length > 20 ? `${message.text[0].slice(0, 20)}...` : (
                            message.text[0].length > 0 ? `${message.text[0]} ...` : ''
                          )
                        )
                      }
                    </em>
                  </span>
                </>
              )
            }}
          )} 
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
