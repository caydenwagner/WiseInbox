# Wise Inbox - A secure email browsing application with scam detection

This is a cross-platform mobile application built with React Native that integrates with the Gmail API using OAuth. It allows users to scan their emails for potential phishing scams using a machine learning model. The app includes a Node.js/Express.js backend server to handle API requests, authentication, and communication with the machine learning model.

## Features

- **OAuth Authentication**: Securely authenticate with your Google account to access Gmail data.
- **Email Listing**: View a list of emails in your Gmail inbox.
- **Email Details**: View the subject, sender, recipients, and body content of individual emails.
- **Phishing Detection**: Scan emails for potential phishing scams using a machine learning model.

## Screenshots

<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/31182d35-52dc-434d-82da-c5792ae47a4f" width="300">

View your emails in a list

<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/7f1a339e-5223-4db3-bfc4-f3c3bd2ebf98" width="300">

<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/35af83aa-8adf-4a84-8e5d-f61af22d3cea" width="300">

Click on an email to open the full screen modal. In this modal, you can view more details about the email, along with the security scan section. The security scan section will either display as safe, caution, or unsafe depending on the analysis of the ML Model.

<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/8005b60e-7e87-456e-9bd0-c01d25f8a07d" width="300">

<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/07140315-9be1-4fb3-9dc8-3f9adba1b1a2" width="300">

When an email is found to be unsafe by the ML Model, a list of quick actions will be displayed that the user can choose from. Notice that the app also has a dark mode.

## Installation

Follow these steps to set up and run the project on your local machine:

### Prerequisites

- Node.js (v12 or later)
- React Native development environment (follow the [official React Native setup guide](https://reactnative.dev/docs/environment-setup))
- Google Cloud Platform project with Gmail API enabled
- Access to the machine learning model API (hosted separately)

### Backend Setup

1. Clone the repository: `git clone https://github.com/your-username/phishing-detection-app.git`
2. Navigate to the backend directory: `cd WiseInbox/BackEnd`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - `GOOGLE_CLIENT_ID`: Your Google Cloud Platform client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google Cloud Platform client secret
   - `GOOGLE_REDIRECT_URI`: The redirect URI for your application (e.g., `http://localhost:3000/auth/google/callback`)
   - `SSL_CERT_PATH`: The path to a self-signed SSL certificate
   - `SSL_KEY_PATH`: The path to the SSL key
   - `ML_API`: The URL of the machine learning model API
5. Start the backend server: `node index.js`

### Mobile App Setup

1. Navigate to the mobile app directory
2. Install dependencies: `npm install`
3. `cd ios && pod install`
4. Start the React Native packager: `npm start`
5. Run the app on your preferred platform:
   - For iOS: `npm run ios`
   - For Android: `npm run android`
