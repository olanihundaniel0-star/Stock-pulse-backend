FROM node:22-alpine AS deps
ARG CACHEBUST=1
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate > /tmp/prisma-out.txt 2>&1 || (cat /tmp/prisma-out.txt && echo "=== FAILED ===" && exit 1)
RUN npx tsc -p tsconfig.build.json

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
# NOTE: DATABASE_URL (and DIRECT_URL) are runtime-only secrets.
# They must be injected by the platform (Railway/Fly/etc.) at container
# runtime, never baked via ARG/ENV at build time (avoids leaking secrets
# into image layers and stale build-time values).
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
# Run as non-root for least privilege (node:22-alpine ships a `node` user).
# COPY preserves root ownership; /app only needs reads at runtime.
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || curl -fsS http://127.0.0.1:3000/api/health || exit 1
CMD ["npm", "run", "start:prod"]