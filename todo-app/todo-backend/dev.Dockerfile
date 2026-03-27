FROM node:24-alpine
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN npm install
ENV DEBUG=todo-express-backend:*
USER node
CMD ["npm", "run", "dev"]