# Use a lightweight Node.js base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the application code
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the application
CMD ["node", "app.js"]


