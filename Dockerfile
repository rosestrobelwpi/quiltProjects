FROM node:16-alpine
WORKDIR /app
COPY build/ /app/build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

