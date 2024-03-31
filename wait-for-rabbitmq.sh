#!/bin/bash

# Wait for RabbitMQ server to be ready
until nc -z rabbitmq 5672; do
    echo "$(date) - waiting for RabbitMQ server at rabbitmq:5672..."
    sleep 1
done

# Start service
node index.js