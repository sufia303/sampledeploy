document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const chatMessages = document.getElementById("chat-messages");

  const API_URL = "http://localhost:5006/auth/chat"; // Updated backend API URL

  function sendMessage() {
      const message = userInput.value.trim();
      const username = localStorage.getItem("username") || "guest"; // Fetch username from storage

      if (!message) return;

      appendMessage("user", message);
      userInput.value = ""; // Clear input field

      // Send user message to backendn
      fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sender: username, content: message })  // Change `username` to `sender`
      })
      .then(response => response.json())
      .then(data => console.log("Message saved:", data))
      .catch(error => console.error("Error sending message:", error));
  }

  function appendMessage(sender, message) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message", sender);
      messageDiv.textContent = message;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleKeyPress(event) {
      if (event.key === "Enter") sendMessage();
  }

  sendButton.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", handleKeyPress);
});
