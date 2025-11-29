# HashSuite - Complete A-to-Z Setup and Run Guide

This guide provides complete bash commands to set up and run HashSuite from scratch, including all necessary installations.

# Extract and navigate
unzip HashSuite.zip -d .
cd /C/Assessment/HashSuite

# Install Node.js and pnpm (platform-specific)
# The winget commands are Windows-specific. On Bash, you typically install 
# Node.js using a package manager (like 'apt' or 'brew') or a version manager (like 'nvm').

# --- Option A (Recommended way to install Node.js and pnpm on Linux/macOS) ---
# Install Node Version Manager (nvm) first (follow instructions from).
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
# After running the above, close and reopen your terminal or run 'source ~/.bashrc' (or appropriate shell config file).
After download run this 
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"


# Install the latest LTS version of Node.js using nvm
nvm install --lts

# Install pnpm using npm (which comes with Node.js)
npm install -g pnpm
# OR install pnpm directly using the pnpm install script:
# curl -fsSL https://get.pnpm.io/install.sh | sh -

# --- Option B (Using a system package manager on Debian/Ubuntu systems) ---
# sudo apt update
# sudo apt install nodejs npm
# sudo npm install -g pnpm


# Install dependencies (once Node.js and pnpm are available)
pnpm install

# Start development server
pnpm dev

# Open in browser: http://localhost:3000/
