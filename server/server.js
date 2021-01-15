const io = require('socket.io')(5000)

io.on('connection', socket => {
  // Static ID for everytime the page is refreshed
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      // Necessary to add the person who is sending the message and removing the one receiving it
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id) // id = it's the person sending the message

      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text, hasRead: false,
      })
    })
  })
})