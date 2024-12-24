FROM node:18-alpine AS base
WORKDIR /app

FROM base AS dependencies
COPY package*.json ./
RUN npm install

FROM base AS development
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
CMD ["npm", "run", "dev"]

FROM base AS production
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build
CMD ["npm", "start"]
