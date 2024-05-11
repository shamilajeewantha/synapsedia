package com.example;
import org.apache.kafka.clients.producer.*;

import java.util.Properties;

public class KafkaProducerExample {
    public static void main(String[] args) {
        // Set up producer properties
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        // Create Kafka producer
        Producer<String, String> producer = new KafkaProducer<>(props);

        // Send messages
        String topic = "test-topic";
        for (int i = 0; i < 10; i++) {
            String key = Integer.toString(i);
            String value = "Message " + i;
            ProducerRecord<String, String> record = new ProducerRecord<>(topic, key, value);
            producer.send(record, new Callback() {
                @Override
                public void onCompletion(RecordMetadata metadata, Exception exception) {
                    if (exception != null) {
                        System.err.println("Error sending message: " + exception.getMessage());
                    } else {
                        System.out.printf("Message sent to topic=%s, partition=%d, offset=%d%n",
                                metadata.topic(), metadata.partition(), metadata.offset());
                    }
                }
            });
        }

        // Close producer
        producer.close();
    }
}