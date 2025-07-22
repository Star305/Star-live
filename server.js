
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('index'));
app.use(express.json());

const messagesFile = path.join(__dirname, 'messages.json');

// Ensure messages.json exists
if (!fs.existsSync(messagesFile)) {
  fs.writeFileSync(messagesFile, JSON.stringify([]));
}

// Endpoint to get messages
app.get('/api/messages', (req, res) => {
  fs.readFile(messagesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Server Error');
    res.json(JSON.parse(data));
  });
});

// Endpoint to post a new message
app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send('Message is required');

  fs.readFile(messagesFile, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Server Error');
    const messages = JSON.parse(data);
    messages.push({ message, timestamp: new Date() });
    fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (err) => {
      if (err) return res.status(500).send('Server Error');
      res.status(201).send('Message received');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
