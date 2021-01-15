import React, { useState } from 'react'
import { Tab, Nav } from 'react-bootstrap'
import Conversations from './Conversations'

const CONVERSATIONS_KEY = 'My Messenger'

export default function Sidebar({ id }) {
  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)

  return (
    <div style={{ width: '250px' }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey} >
        <Nav variant="tabs" className="justify-content-center" >
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>{CONVERSATIONS_KEY}</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small" style={{color: '#fff', backgroundColor: '#4f4e90'}}>
          Your Id: {id}
        </div>
      </Tab.Container>
    </div>
  )
}
