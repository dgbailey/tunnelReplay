# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install React Scripts globally
RUN npm install -g react-scripts

# Copy the entire project to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Install serve to run the production build
RUN npm install -g serve

# Expose the desired port (default is 3000 for React)
EXPOSE 4000

# Specify the command to run when the container starts
CMD ["serve", "-s", "build", "-l", "4000"]
