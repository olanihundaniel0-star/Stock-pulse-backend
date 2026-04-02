FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run prisma:generate
RUN npx tsc -p tsconfig.build.json

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./prisma.config.ts
COPY --from=build /app/src/generated ./src/generated
# Runtime port comes from PORT (default 3000 in main.ts); platforms usually inject PORT.
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ARG CACHEBUST=1
