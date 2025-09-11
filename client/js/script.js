const usernameInput = document.getElementById('usernameInput')
const messagesDiv = document.getElementById('messages')
const messageInput = document.getElementById('messageInput')
const sendBtn = document.getElementById('sendBtn')

const socket = new WebSocket('ws://localhost:8080')

let myUsername = ''
messageInput.disabled = true
sendBtn.disabled = true

setUsernameBtn.addEventListener('click', () => {
  const newUsername = usernameInput.value.trim()
  if (newUsername !== '') {
    myUsername = newUsername
    usernameInput.disabled = true
    setUsernameBtn.disabled = true
    messageInput.disabled = false
    sendBtn.disabled = false
    messageInput.focus()
  }
})

socket.addEventListener('open', (event) => {
  console.log('Connecté au serveur WebSocket !')
})

// Événement déclenché lorsque le client reçoit un message du serveur
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)

  // Création d'un conteneur pour le message
  const messageContainer = document.createElement('div')
  messageContainer.classList.add('message-container')

  // Ajoute une classe CSS pour différencier les messages
  if (data.username === myUsername) {
    messageContainer.classList.add('my-message')
  } else {
    messageContainer.classList.add('other-message')
  }

  // Affiche le nom d'utilisateur et le message
  const messageElement = document.createElement('p')
  messageElement.innerHTML = `<strong>[${data.username}]</strong>: ${data.message}`

  // On ajoute le message dans son conteneur
  messageContainer.appendChild(messageElement)
  messagesDiv.appendChild(messageContainer)
  messagesDiv.scrollTop = messagesDiv.scrollHeight
})

// Événement déclenché en cas d'erreur
socket.addEventListener('error', (event) => {
  console.error('Erreur WebSocket :', event)
})

// Événement déclenché lorsque la connexion est fermée
socket.addEventListener('close', (event) => {
  console.log('Déconnecté du serveur WebSocket.', event.reason, event.code)
  const messageElement = document.createElement('p')
  messageElement.textContent = 'Déconnecté du chat.'
  messagesDiv.appendChild(messageElement)
})

// Fonction pour envoyer un message
function sendMessage() {
  const message = messageInput.value
  const username = myUsername

  if (message.trim() !== '') {
    // Crée un objet pour le message avec le nom d'utilisateur
    const data = {
      username: username,
      message: message,
    }
    // Convertit l'objet en chaîne JSON avant de l'envoyer
    socket.send(JSON.stringify(data))
    messageInput.value = ''
  }
}

// Ajoute un écouteur d'événement sur le bouton d'envoi
sendBtn.addEventListener('click', sendMessage)

// Permet d'envoyer le message en appuyant sur 'Entrée'
messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage()
  }
})
