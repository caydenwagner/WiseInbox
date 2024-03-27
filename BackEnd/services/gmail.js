// services/gmail.js
import { google } from 'googleapis';
import { findContent } from '../utils/email.js';
import { decode } from 'html-entities';

export async function getGmailClient(authToken) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_APP_ID,
    process.env.GOOGLE_APP_SECRET,
    process.env.REDIRECT_URI
  );

  oAuth2Client.setCredentials({
    access_token: authToken,
  });

  return google.gmail({ version: 'v1', auth: oAuth2Client });
}

export async function fetchMessages(gmail, maxResults = 20) {
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults,
    });

    const messages = response.data.messages;

    // Fetch the details of messages
    const fullMessages = await Promise.all(
      messages.map(async (message) => {
        return await getMessageDetails(gmail, message.id);
      })
    );

    return fullMessages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

export async function getMessageDetails(gmail, emailID) {
  try {
    const messageDetails = await gmail.users.messages.get({
      userId: 'me',
      id: emailID,
      format: 'full', // Requesting full message details
    });

    const { payload } = messageDetails.data;
    const headers = payload.headers;
    const fromHeader = headers.find((header) => header.name === 'From');
    const sender = fromHeader ? fromHeader.value : 'Sender information not available';
    const regex = /^(.+?)\s*<(.+?)>$/;
    const match = regex.exec(sender);
    let senderEmail = '';
    let senderName = '';

    if (match) {
      senderName = match[1].trim();
      senderEmail = match[2].trim();
    } else {
      senderName = '';
      senderEmail = sender.trim();
    }

    const dateHeader = headers.find((header) => header.name === 'Date');
    const emailDate = dateHeader ? new Date(dateHeader.value) : null;
    const subjectHeader = headers.find((header) => header.name === 'Subject');
    const subject = subjectHeader ? subjectHeader.value : 'No Subject';
    const snippet = decode(messageDetails.data.snippet);
    const isInbox = messageDetails.data.labelIds.includes('INBOX');
    const isRead = !messageDetails.data.labelIds.includes('UNREAD');

    let body = '';
    let html = '';

    if (payload.parts) {
      const { body: extractedBody, html: extractedHtml } = findContent(payload.parts);
      body = extractedBody;
      html = extractedHtml;
    }

    const email = {
      id: emailID,
      sender: senderName,
      senderEmail,
      body,
      html,
      date: emailDate,
      subject,
      snippet,
      isInbox,
      isRead,
    };

    return email;
  } catch (error) {
    console.error('Error getting message details:', error);
    throw error;
  }
}

export async function blockSender(gmail, sender) {
  try {
    await gmail.users.settings.filters.create({
      userId: 'me',
      resource: {
        criteria: {
          from: sender,
        },
        action: {
          removeLabelIds: ['INBOX'],
        },
      },
    });
  } catch (error) {
    console.error('Error blocking sender:', error);
    throw error;
  }
}

export async function deleteMessage(gmail, emailID) {
  try {
    await gmail.users.messages.delete({
      userId: 'me',
      id: emailID,
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

export async function reportMessage(gmail, emailID) {
  try {
    await gmail.users.messages.modify({
      userId: 'me',
      id: emailID,
      resource: {
        addLabelIds: ['SPAM'],
      },
    });
  } catch (error) {
    console.error('Error reporting message:', error);
    throw error;
  }
}