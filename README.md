# Wise Inbox - A secure email browsing application with scam detection

This is a cross-platform mobile application built with React Native that integrates with the Gmail API using OAuth. It allows users to scan their emails for potential phishing scams using a machine learning model. The app includes a Node.js/Express.js backend server to handle API requests, authentication, and communication with the machine learning model.

## Features

- **OAuth Authentication**: Securely authenticate with your Google account to access Gmail data.
- **Email Listing**: View a list of emails in your Gmail inbox.
- **Email Details**: View the subject, sender, recipients, and body content of individual emails.
- **Phishing Detection**: Scan emails for potential phishing scams using a machine learning model.
- **Generative AI**: Get a list of flags that may indicate a scam within every email.

## Screenshots

<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/31182d35-52dc-434d-82da-c5792ae47a4f" width="300">

View your emails in a list

<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/bbc1afa8-953a-4e26-a08c-2f57a03456a6" width="300">
<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/f8ee566a-ab20-40ba-a2e5-def6eb930d05" width="300">
<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/abcc238d-1954-47dc-abbd-2a51fdbcf94d" width="300">

View Safe emails with unrestricted access.



<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/92ce979f-d22c-4339-a378-66e2faf4f519" width="300">
<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/57096c7a-535a-4c94-82e0-f8a07afe6f93" width="300">
<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/94d96d18-9c5c-4833-8935-86cbab94683f" width="300">

Cautious emails are flagged with a yellow indicator. These are typically marketing emails and security alert emails. When the user clicks on show more details, they are informed that there are no red flags in the email to be concerned about. 



<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/7ae00c7a-6a72-4e3a-9991-47373c7853e8" width="300">
<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/79f6f45b-d38d-4371-9f52-5c59da81f3fc" width="300">
<img src="https://github.com/cwagner2325/WiseInbox/assets/78619267/61be493e-1a94-4bf5-bb52-92243f924f58" width="300">

Unsafe emails are flagged with red indicators in our application. The user is preseted with a list of reccommended actions to take. These include reporting the mail, blocking the sender, and deleting the mail. When the user clicks more details, they are presented with a list of red flags that are present in the email. 



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
