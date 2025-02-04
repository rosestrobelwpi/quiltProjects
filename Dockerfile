# Use an official Node.js runtime as base image
FROM node:18-alpine  

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY quilt-react/package.json quilt-react/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire React app
COPY quilt-react ./

# Build React
RUN npm run build

# Move build folder to the correct location
RUN mv /app/build /app/quilt-react/build

# Use a lightweight web server to serve the build files
RUN npm install -g serve
CMD ["serve", "-s", "quilt-react/build", "-l", "3000"]
