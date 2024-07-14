import paho.mqtt.client as mqtt

# Callbacks
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    client.subscribe("test")

def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))

# MQTT client setup
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Connect to broker
client.connect("34.16.173.64", 1883, 60)

# Start the MQTT client loop
client.loop_start()

# Publish a message
client.publish("test", "Hello from outside")

# Keep the script running to receive messages
input("Press Enter to exit...\n")
client.loop_stop()
client.disconnect()
