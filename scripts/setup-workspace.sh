#!/bin/bash
set -e

echo "[SYSTEM CONFIG] Initiating Dhammapeta Photographers Association Portal installation sequence..."

# Install dependencies uniformly across both decoupled boundaries
npm install

echo "[SYSTEM CONFIG] Syncing Client Application Workspace Module Dependencies..."
cd frontend && npm install && cd ..

echo "[SYSTEM CONFIG] Syncing API Engine Workspace Module Dependencies..."
cd backend && npm install && cd ..

echo "[SUCCESS] Enterprise software stack compiled and balanced successfully. Ready for initialization."
