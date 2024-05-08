#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Build TypeScript files
echo "Compiling TypeScript files..."
npx tsc

# Run the application
echo "Starting the application..."
node dist/app.js
