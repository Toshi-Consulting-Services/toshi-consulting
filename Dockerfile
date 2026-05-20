# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Build-time public site URL (set in docker-compose). Drives canonical URLs,
# robots noindex, sitemap, and OG image absolute URLs.
ARG NEXT_PUBLIC_SITE_URL=https://toshiconsulting.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
