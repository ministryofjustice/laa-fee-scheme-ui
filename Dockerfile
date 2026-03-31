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

# Build-time env vars for API configuration (pass via --build-arg)
ARG VITE_API_URL
ARG VITE_API_TOKEN
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_TOKEN=$VITE_API_TOKEN

# Build Vite app
RUN yarn build


# ---------- Stage 2: Runtime ----------
FROM nginxinc/nginx-unprivileged:stable-alpine

# Remove default site config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]