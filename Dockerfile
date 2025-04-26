# Use Node.js as base image
FROM node:18-alpine 

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js app (for production)
RUN npm run build

# Expose Next.js default port
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "run", "start"]