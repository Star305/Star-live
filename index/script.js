async function sendMessage() {
const messageInput = document.getElementById('messageInput');
  const message = messageInput.value.trim();
  if (!message) {
    alert('Please enter a message.');
    return;
  }

  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (response.ok) {
      messageInput.value = '';
      loadMessages();
    } else {
      alert('Failed to send message.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred.');
  }
}

async function loadMessages() {
  try {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    const messagesList = document.getElementById('messagesList');
    messagesList.innerHTML = '';
    messages.reverse().forEach(msg => {
      const li = document.createElement('li');
      li.textContent = msg.message;
      messagesList.appendChild(li);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadMessages);
