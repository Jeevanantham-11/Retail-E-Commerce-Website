# Stage 1: Build the application securely
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies and build
COPY package*.json ./
RUN npm ci

COPY . .
# We must build the Next app to generate the .next/standalone folder
RUN npm run build

# Stage 2: Create the production image via the Standalone output
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV production
# Google Cloud Run expects the app to bind to 0.0.0.0 and listen on the supplied $PORT
ENV HOSTNAME "0.0.0.0"

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy over the optimized standalone build generated from Stage 1
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Expose generic port, Cloud Run overrides this via env var anyway
EXPOSE 8080

# Next.js standalone runs the server via server.js by default
CMD ["node", "server.js"]
