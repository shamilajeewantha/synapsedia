from gpiozero import Motor
from time import sleep
import pika

motor = Motor(forward=17, backward=18)

# Connect to RabbitMQ server
connection = pika.BlockingConnection(pika.ConnectionParameters('34.125.41.92'))
channel = connection.channel()

# Declare the queue to consume messages from
channel.queue_declare(queue='hello')

# Callback function to handle incoming messages
def callback(ch, method, properties, body):
    print("Received message:", body.decode())
    if body.decode() == 'move':
        motor.forward()
        sleep(1)
        motor.stop()


# Start consuming messages from the queue
channel.basic_consume(queue='hello', on_message_callback=callback, auto_ack=True)

print('Waiting for messages. To exit, press CTRL+C')

# Keep the script running to receive messages
channel.start_consuming()