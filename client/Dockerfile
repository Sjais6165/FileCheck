# # Use official Node.js image
# FROM node:18

# # Set working directory
# WORKDIR /app

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy entire frontend code
# COPY . .

# # Expose React dev server port
# EXPOSE 3000

# # Start frontend
# CMD ["npm", "start"]


# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the frontend code
COPY . .

# Expose React dev server port
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]

