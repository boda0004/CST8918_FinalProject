# Backend Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S express -u 1001
RUN chown -R express:nodejs /app
USER express

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "index.js"]