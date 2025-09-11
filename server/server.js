const { WebSocketServer } = require('ws')
const express = require('express')
const path = require('path')

const app = express()
const http = require('http')
const server = http.createServer(app)

const wss = new WebSocketServer({ server })

app.use(express.static(path.join(__dirname, '..', 'client')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
})

wss.on('connection', (ws) => {
  console.log('Nouveau client connecté !')

  ws.on('message', (message) => {
    const messageString = message.toString()

    try {
      const parsedMessage = JSON.parse(messageString)
      console.log(
        `Message de [${parsedMessage.username}] : ${parsedMessage.message}`
      )

      wss.clients.forEach((wsClient) => {
        if (wsClient.readyState === wsClient.OPEN) {
          wsClient.send(messageString)
        }
      })
    } catch (error) {
      console.error("Erreur d'analyse JSON ou message invalide:", error)
    }
  })

  ws.on('close', () => {
    console.log('Un client a été déconnecté.')
  })

  ws.on('error', (error) => {
    console.error('Une erreur est survenue :', error)
  })
})

const PORT = 8080
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
