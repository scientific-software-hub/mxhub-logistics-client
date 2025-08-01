FROM node:20 as builder

# Set the working directory in the container
WORKDIR /src

# Copy sources
COPY . /src

# Build the application
RUN npm install &  NODE_OPTIONS=--openssl-legacy-provider VUE_APP_BASE_URL=/ npm run build

# Use the official Nginx base image
FROM nginx:1.25.3-alpine

# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# Copy the local static content into the container at /usr/share/nginx/html
COPY --chown=nginx:nginx --from=builder /src/dist /usr/share/nginx/html/

# Environment variable to set the timezone for the containers
ENV TZ=Europe/Berlin

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]


