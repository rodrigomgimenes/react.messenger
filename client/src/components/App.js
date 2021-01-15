import React from 'react'
import Login from './Login'
import useLocalStorage from '../hooks/useLocalStorage'
import Chatboard from './Chatboard'
import { ConversationsProvider } from '../contexts/ConversationsProvider'
import { SocketProvider } from '../contexts/SocketProvider'

function App() {
  const [id, setId] = useLocalStorage('id')

  const chatboard = (
    <SocketProvider id={id}>
      <ConversationsProvider id={id}>
        <Chatboard id={id} />
      </ConversationsProvider>
    </SocketProvider>
  )

  return (
    // The Login page is only necessary here to get an ID from the user (this ID is being saved on LocalStorage)
    id ? chatboard : <Login onIdSubmit={setId} />
  )
}

export default App;
