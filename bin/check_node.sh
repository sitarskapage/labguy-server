#!/bin/bash

echo "Checking if the PM2 process 'www' is running..."

# Ensure PM2 is in the PATH
PATH=$PATH:/usr/local/bin

# Get the status of the PM2 process 'www'
status=$(pm2 show www | grep status | awk '{print $4}')

# Check if the status is 'online'
if [ "$status" == "online" ]; then
  echo "PM2 process 'www' is running."
else
  echo "PM2 process 'www' is not running."
  # Start the process using PM2
  echo "Starting 'www' process with PM2..."
  pm2 resurrect
  pm2 start www
fi
