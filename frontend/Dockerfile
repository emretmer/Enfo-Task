# Stage 1: Build the application
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Clean npm cache
RUN yarn cache clean --force

# Install dependencies
RUN yarn install

# Copy the rest of your application code
COPY . .



# Build the application
RUN yarn run build
