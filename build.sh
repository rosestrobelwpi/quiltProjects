#!/bin/bash

# Set Docker Buildx to enable multi-platform builds
docker buildx create --use

# Build the image explicitly for `linux/amd64`
docker buildx build --platform linux/amd64 \
    -t bentyler2003/quiltmakermqp:latest \
    --push .

# Remove unused Docker images to free up space
docker system prune -f

echo "✅ Build and push complete. Pull the image on your EC2 instance."
