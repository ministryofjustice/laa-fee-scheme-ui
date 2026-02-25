# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Enable Corepack and set correct Yarn version
RUN corepack enable
RUN corepack prepare yarn@4.11.0 --activate

# Copy only dependency files first (better layer caching)
COPY package.json yarn.lock .yarnrc.yml ./

# If repo uses .yarn directory (Yarn 4 zero-install)
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install --immutable

# Copy rest of source code
COPY . .

# Build Vite app
RUN yarn build


# ---------- Stage 2: Runtime ----------
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]