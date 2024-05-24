# Step 1: Use an official Node.js runtime as a base image
FROM node:16-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your frontend code into the container
COPY . .

# Step 6: Build your React application using Vite
RUN npm run build

# Step 7: Install a light-weight server to serve the build files
# Using serve to serve the build directory
RUN npm install -g serve

# Step 8: Expose the port the app runs on
EXPOSE 5000

# Step 9: Define the command to run your app
CMD ["serve", "-s", "dist", "-l", "5000"]
