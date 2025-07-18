# market
Market
Requirment vesrion
=====================
# Node Version : v22.17.0
# Angular : 19.2.0

🟢 Step 1: Install Node.js v22.17.0
🖥️ Windows / macOS / Linux
Go to the official Node.js downloads page:

🔗 https://nodejs.org/en/download

⚠️ Node v22.17.0 is not an official LTS version, so it might be under "Current" or "Other Downloads".


 Alternative: Use nvm (Node Version Manager)
If you're on Linux/macOS, it's better to use nvm:

1. Install nvm:
bash
Copy
Edit
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
2. Install Node.js v22.17.0:
bash
Copy
Edit
nvm install 22.17.0
nvm use 22.17.0
nvm alias default 22.17.0
✅ Verify Node and npm:
bash
Copy
Edit
node -v
# v22.17.0

npm -v
# (should be something like 10.x)









# Step 2: Install Angular CLI v19.2.0
You must install Angular CLI globally using npm:

bash
Copy
Edit
npm install -g @angular/cli@19.2.0
✅ Verify Angular version:
bash
Copy
Edit
ng version
You should see:

yaml
Copy
Edit
Angular CLI: 19.2.0
Node: 22.17.0





