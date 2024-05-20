const express = require('express');
const amqp = require('amqplib');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 3001;

// RabbitMQ connection options
const rabbitmqOptions = {
  protocol: 'amqp',
  hostname: 'localhost',
  port: 5672,
  username: 'guest',
  password: 'guest',
  vhost: '/'
};

// Connect to RabbitMQ
async function connectToRabbitMQ() {
  try {
    const connection = await amqp.connect(rabbitmqOptions);
    const channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    return channel;
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error);
  }
}

const channelPromise = connectToRabbitMQ();

app.use(bodyParser.json());

// Enable CORS middleware
app.use(cors());

// Endpoint to publish messages to RabbitMQ queue
app.post('/publish', async (req, res) => {
  try {
    const channel = await channelPromise;
    const queueName = 'hello';
    const message = req.body.message || 'Hello, RabbitMQ!';
    await channel.assertQueue(queueName, { durable: false });
    await channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Published message to RabbitMQ queue "${queueName}": ${message}`);
    res.status(200).json({ success: true, message: 'Message published to RabbitMQ queue.' });
  } catch (error) {
    console.error('Error publishing message to RabbitMQ:', error);
    res.status(500).json({ success: false, error: 'Failed to publish message to RabbitMQ queue.' });
  }
});

// Endpoint to consume messages from RabbitMQ queue
app.get('/consume', async (req, res) => {
  try {
    const channel = await channelPromise;
    const queueName = 'hello';
    await channel.assertQueue(queueName, { durable: false });
    const message = await channel.get(queueName);
    if (message) {
      console.log(`Consumed message from RabbitMQ queue "${queueName}": ${message.content.toString()}`);
      res.status(200).json({ success: true, message: message.content.toString() });
    } else {
      res.status(404).json({ success: false, message: 'No message available in RabbitMQ queue.' });
    }
  } catch (error) {
    console.error('Error consuming message from RabbitMQ:', error);
    res.status(500).json({ success: false, error: 'Failed to consume message from RabbitMQ queue.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
