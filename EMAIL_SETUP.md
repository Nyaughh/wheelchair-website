# Emergency Email Setup Guide

## Prerequisites

1. **Gmail Account Setup**:

   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password:
     - Go to Google Account settings
     - Security → 2-Step Verification → App passwords
     - Generate a new app password for "Mail"

2. **Environment Variables**:
   Create a `.env.local` file in your Next.js project root with:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   ```

## Configuration Steps

### 1. Update NodeMCU Code

In `nodemcucode.ino`, update these variables:

```cpp
// Replace with your computer's IP address on the same WiFi network
const char* emailApiUrl = "http://YOUR_COMPUTER_IP:3000/api/send-email";

// Replace with the email address where you want to receive emergency alerts
const char* emergencyEmail = "your-emergency-email@example.com";
```

### 2. Find Your Computer's IP Address

**Windows**:

```cmd
ipconfig
```

Look for "IPv4 Address" under your WiFi adapter.

**Mac/Linux**:

```bash
ifconfig
```

Look for "inet" followed by your IP address.

### 3. Start the Next.js Server

```bash
npm run dev
```

### 4. Test the Setup

1. Upload the updated code to your NodeMCU
2. Press the emergency button
3. Check your email for the emergency alert
4. Monitor the Serial Monitor for debugging information

## Troubleshooting

- **Email not sending**: Check that your Gmail credentials are correct in `.env.local`
- **Connection failed**: Verify the IP address in `emailApiUrl` matches your computer's IP
- **WiFi issues**: Ensure both NodeMCU and computer are on the same WiFi network

## Security Notes

- Keep your `.env.local` file secure and never commit it to version control
- The app password is more secure than using your regular Gmail password
- Consider using environment-specific email addresses for testing
