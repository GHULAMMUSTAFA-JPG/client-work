# Use official Node.js runtime as base image for building
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for efficient caching
COPY package.json  ./

# Install dependencies
RUN npm install 

# Copy rest of the project files
COPY . .

# Build the Next.js project
RUN npm run build

# Use a minimal runtime image for production
FROM node:18-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port
EXPOSE 3000

# Set environment variable to production
ENV NODE_ENV=production

# Start the Next.js server
CMD ["npm", "run", "start"]
