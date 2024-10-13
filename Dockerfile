# Base stage - Common dependencies
FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
EXPOSE 80

# Builder stage - Builds the application
FROM base as builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Production stage - Runs the built app in production mode
FROM node:18-alpine as production
WORKDIR /app

# Environment setup
ENV NODE_ENV=production

# Install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Create non-root user for better security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Copy necessary files from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Start the Next.js application in production mode
CMD ["npm", "start", "--", "-p", "80"]
