# Build stage
FROM node:24-alpine AS build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run test:run
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
RUN npm run build

# Serve stage
FROM nginx:1.29-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html