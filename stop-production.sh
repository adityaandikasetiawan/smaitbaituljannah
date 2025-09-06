#!/bin/bash

# Script untuk menghentikan aplikasi SMAIT Baituljannah
echo "Stopping SMAIT Baituljannah Application..."

# Stop PM2 process
pm2 stop smaitbaituljannah
pm2 delete smaitbaituljannah

echo "Application stopped successfully!"
