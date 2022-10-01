FROM node:14
COPY package*.json ./
COPY dist dist
# Build production app
ENTRYPOINT ["npm", "run", "serve:ssr"]
