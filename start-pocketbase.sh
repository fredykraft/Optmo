#!/bin/bash

# PocketBase Quick Start Script
# This script helps you set up and run PocketBase locally

set -e  # Exit on any error

echo "======================================"
echo "OPTMO PocketBase Quick Start"
echo "======================================"
echo ""

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Check if PocketBase is installed
if ! command -v pocketbase &> /dev/null; then
    echo "❌ PocketBase not found in PATH"
    echo ""
    echo "Download PocketBase from: https://pocketbase.io/"
    echo "Then:"
    echo "  1. Extract the downloaded file"
    echo "  2. Copy 'pocketbase' executable to this directory or add to PATH"
    echo "  3. Run this script again"
    exit 1
fi

echo "✅ PocketBase found"
echo ""
echo "Starting PocketBase..."
echo "================================"
echo ""
echo "PocketBase will start at: http://localhost:8090"
echo "Admin UI: http://localhost:8090/_/"
echo "Website: http://localhost:8000"
echo "Data dir: $SCRIPT_DIR/pb_data"
echo ""
echo "When you see 'Server started', open http://localhost:8090 in your browser"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "================================"
echo ""

mkdir -p pb_data
pocketbase serve --dir ./pb_data
