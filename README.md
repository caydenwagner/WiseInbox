## WiseInbox

This repository contains a React Native front end in the root directory, along with a BackEnd directory that houses the server launch point (index.js) for development purposes.

To get started, follow these steps:

# Clone the repository:
git clone https://github.com/cwagner2325/WiseInbox.git

# Navigate to the project directory:
cd WiseInbox

# Install dependencies:
npm install

# Install pods:
cd ios/
pod install
cd ..

# To start the React Native front end, run:
npx react-native start

# To run the app on an Android device or emulator, use:
npx react-native run-android

# For iOS, use:
npx react-native run-ios


## Backend Setup
# The backend is located in the BackEnd directory. To run the server, follow these steps:

# Navigate to the BackEnd directory:
cd BackEnd

# Install backend dependencies:
npm install express

# Start the backend server:
node index.js

The server will be running on http://localhost:3000.
