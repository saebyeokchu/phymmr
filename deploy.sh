#!/usr/bin/env bash

echo "> Starting PHYMMR Deployment"

# Navigate to application directory
APP_DIR="/home/ec2-user/meomureum-next"
cd $APP_DIR || { echo "Failed to navigate to $APP_DIR"; exit 1; }

# Ensure correct permissions for deployment scripts
echo "> Setting permissions for deploy script"
chmod +x ./deploy.sh

# Verify Node.js and npm are installed
echo "> Checking Node.js and npm versions"
node -v || { echo "Node.js is not installed"; exit 1; }
npm -v || { echo "npm is not installed"; exit 1; }

# Install application dependencies
echo "> Installing dependencies"
npm install || { echo "npm install failed"; exit 1; }

# Stop existing PM2 process
echo "> Stopping existing PM2 process"
pm2 delete phymmr || echo "No existing PM2 process found"

# Start the application with PM2
echo "> Starting the application with PM2"
pm2 start "npx next start" --name phymmr --cwd $APP_DIR || { echo "Failed to start application"; exit 1; }

echo "> Deployment completed successfully"