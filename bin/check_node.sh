#!/bin/bash

echo "Checking if the PM2 process 'www' is running..."

# Ensure PM2 is in the PATH
PATH=$PATH:/usr/local/bin

# Check if the process 'www' is running using PM2
pm2 describe www > /dev/null 2>&1

# Check the exit status of the pm2 describe command
if [ $? -eq 0 ]; then
  echo "PM2 process 'www' is running."
else
  echo "PM2 process 'www' is not running."
  # Start the process using PM2
  echo "Starting 'www' process with PM2..."
  pm2 resurrect
  pm2 start www
fi
