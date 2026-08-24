# ==========================================
# Production Multi-Stage Dockerfile for AgriLink
# ==========================================

# 1. Base Image
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# 2. Dependencies
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

# 3. Builder
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npx prisma generate
RUN npm run build

# 4. Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.next ./.next

USER nextjs

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push --accept-data-loss && node prisma/seed.mjs && npm run start"]
