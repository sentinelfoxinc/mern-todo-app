# Use the official Node.js 14 image as the base image
FROM node

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install frontend dependencies
RUN npm install

# Copy all files from the current directory to the container working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "start"]