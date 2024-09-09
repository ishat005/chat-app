const socket = io("http://localhost:3000"); //server hosting socket js application
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const name = prompt("What is your name?");

appendMessage("You joined", true);
socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name} : ${data.message}`); // sends info from the server to the client (data);
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`, true);
});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`, 'you' );
  socket.emit("send-chat-message", message); //sends info from the client to the server
  messageInput.value = "";
});

function appendMessage(message, isSystemMessage = false, direction) {
  const messageElement = document.createElement('div');
  if (isSystemMessage) {
    messageElement.classList.add('message', 'you');
  } else {
    messageElement.classList.add('message', 'me');
  }
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
}
