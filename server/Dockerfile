# # Use official Node.js image
# FROM node:18

# # Set working directory
# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy rest of the backend code
# COPY . .

# # Install nodemon globally (or you can use local nodemon if preferred)
# RUN npm install -g nodemon
# RUN npm install bcrypt@5.0.1
# # Expose server port
# EXPOSE 5000

# # Start with nodemon
# CMD ["nodemon", "index.js"]


# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend code
COPY . .

# Install nodemon globally (or you can use local nodemon if preferred)
RUN npm install -g nodemon


# Expose server port
EXPOSE 5000

# Start with nodemon
CMD ["nodemon", "index.js"]


