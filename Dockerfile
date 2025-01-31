# Use an official Node.js runtime as base image
FROM node:16-alpine

# Set working directory in container
WORKDIR /app

# Copy package.json and install dependencies
COPY quilt-react/package.json ./
RUN npm install

# Copy React app and build it
COPY quilt-react ./
RUN npm run build

# Use a lightweight web server to serve the build files
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
