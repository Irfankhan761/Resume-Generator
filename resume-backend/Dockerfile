# Use official Node.js image as the base image
FROM node:22.5-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3333

# Run the AdonisJS application
CMD ["npm", "run", "dev"]
