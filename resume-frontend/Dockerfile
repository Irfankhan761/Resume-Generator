# Dockerfile for React app using Vite in development mode
FROM node:22.5-alpine

# Set working directory
WORKDIR /app

# Install git (required for npm to fetch dependencies from git repositories)
RUN apk add --no-cache git

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the app in development mode
CMD ["npm", "run", "start"]
