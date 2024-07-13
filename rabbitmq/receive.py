import pika

# Connect to RabbitMQ server
connection = pika.BlockingConnection(pika.ConnectionParameters('34.16.173.64'))
channel = connection.channel()

# Declare the queue to consume messages from
channel.queue_declare(queue='hello')

# Callback function to handle incoming messages
def callback(ch, method, properties, body):
    print("Received message:", body.decode())

# Start consuming messages from the queue
channel.basic_consume(queue='hello', on_message_callback=callback, auto_ack=True)

print('Waiting for messages. To exit, press CTRL+C')

# Keep the script running to receive messages
channel.start_consuming()
