# Stage 1: Build the application
FROM node:latest AS builder

# Create a directory for the app code
WORKDIR /usr/src/app

# Copy only package.json to install dependencies
COPY package.json .

# Install dependencies
RUN npm install

# Stage 2: Create the production image
FROM node:alpine

# Create a non-root user
RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser

# Set the working directory
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY . .

# Install necessary dependencies for Puppeteer and Chromium
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    tini

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
# Create screenshots directory
RUN mkdir -p /usr/src/app/screenshots

# Set permissions for the appuser
RUN chown -R appuser:appuser /usr/src/app/screenshots



# Set the non-root user as the default user
USER appuser

# Specify the executable path for Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Entry point with tini for signal handling
ENTRYPOINT ["/sbin/tini", "--"]

# Command to run the application
CMD ["node", "--unhandled-rejections=strict", "app.js"]