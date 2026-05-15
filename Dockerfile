FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=development

# npm ci para dependencias exactas del package-lock
COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 5173

CMD ["npm", "run", "dev"]
