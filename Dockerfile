# Stage 1: Build
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies (use production flag for dependencies only if applicable)
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Build the application (if applicable, e.g., for frontend assets or TypeScript compilation)
# Uncomment the below line if you have a build step
# RUN npm run build

# Stage 2: Production
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy only the built artifacts and necessary files from the builder stage
COPY --from=builder /app .

# Install only production dependencies
# This step ensures no devDependencies are present in the final image
RUN npm ci --only=production

# Expose the application port (adjust based on your app's listening port)
EXPOSE 8080

# Start the application
CMD ["npm", "start"]

