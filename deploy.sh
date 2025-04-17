#!/usr/bin/env bash
echo "> Starting PHYMMR Deployment"

# Navigate to application directory
APP_DIR="/home/ec2-user"
cd $APP_DIR || { echo "Failed to navigate to $APP_DIR"; exit 1; }

# Ensure correct permissions for deployment scripts
echo "> Setting permissions for deploy script"
chmod +x ./deploy.sh
docker-compose pull
docker-compose up -d

echo "> Deployment completed successfully"

# cuu2253/phymmr:latest