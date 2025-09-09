# Stage 1: Build the Angular app
FROM node:20.22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install -g npm@11
RUN npm install

COPY . .
RUN npm run build --production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app from builder
COPY --from=builder /app/dist/adv-tasker-web /usr/share/nginx/html

# Copy custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]