# Use the Node.js base image
FROM node

# Set working directory for the Node.js application
WORKDIR /app

# Install Node Exporter
RUN apt-get update && \
    apt-get install -y curl && \
    curl -LO https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-amd64.tar.gz && \
    tar xvf node_exporter-1.2.2.linux-amd64.tar.gz && \
    cp node_exporter-1.2.2.linux-amd64/node_exporter /usr/local/bin/

# Copy package.json to the working directory
COPY package.json .

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose ports for both Node.js app and Node Exporter
EXPOSE 8000
EXPOSE 9100 


# Start both Node.js application and Node Exporter
CMD npm start & /usr/local/bin/node_exporter
