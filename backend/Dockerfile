FROM node:20-alpine AS build-engine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime-layer

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

COPY --from=build-engine /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]
