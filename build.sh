#!/bin/bash

# Exit script on error
set -e

# Navigate to the React project folder
cd quilt-react

# Install dependencies and build React app
npm install
npm run build

# Navigate back to root directory
cd ..

# Build and push Docker image
docker build -t bentyler2003/quiltmakermqp .
docker push bentyler2003/quiltmakermqp
