FROM node:12-alpine

RUN apk add git bash curl \
  && apk --no-cache add --virtual build-deps build-base

# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN npm install --silent
# Copy all other source code to work directory
ADD . /usr/src/app
# TypeScript
RUN npm run tsc
# Start
CMD [ "npm", "start" ]
EXPOSE 8080