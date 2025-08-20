import { useState, useEffect } from 'react';
import { EmailConfig, LocationData } from '@/types';

export const useEmail = (addLog: (message: string, type?: string) => void) => {
  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    emergencyEmail: ''
  });
  const [isEmailConfigured, setIsEmailConfigured] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    const savedEmailConfig = localStorage.getItem('emailConfig');
    if (savedEmailConfig) {
      const config = JSON.parse(savedEmailConfig);
      setEmailConfig(config);
      setIsEmailConfigured(!!config.emergencyEmail);
    }
  }, []);

  const sendEmergencyEmail = async (location: LocationData) => {
    if (!isEmailConfigured) {
      addLog('Email not configured for emergency alerts', 'error');
      return;
    }

    setIsSendingEmail(true);
    addLog('Sending emergency email...', 'status');

    try {
      const subject = '🚨 EMERGENCY ALERT - Wheelchair User Needs Help';
      const text = `
EMERGENCY ALERT

A wheelchair user has triggered an emergency alert and needs immediate assistance.

Location Details:
- Coordinates: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}
- Accuracy: ${formatAccuracy(location.accuracy)}
- Address: ${location.address || 'Not available'}
- Time: ${new Date(location.timestamp).toLocaleString()}

Please respond immediately and contact emergency services if necessary.

This is an automated emergency alert from the Voice Controlled Wheelchair system.
      `;

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">🚨 EMERGENCY ALERT</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Wheelchair User Needs Help</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545;">
            <p style="margin: 0 0 15px 0; font-size: 16px; color: #333;">
              A wheelchair user has triggered an emergency alert and needs immediate assistance.
            </p>
            
            <h3 style="color: #dc3545; margin: 20px 0 10px 0;">Location Details:</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li><strong>Coordinates:</strong> ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}</li>
              <li><strong>Accuracy:</strong> ${formatAccuracy(location.accuracy)}</li>
              <li><strong>Address:</strong> ${location.address || 'Not available'}</li>
              <li><strong>Time:</strong> ${new Date(location.timestamp).toLocaleString()}</li>
            </ul>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px;">
              <p style="margin: 0; color: #856404; font-weight: bold;">
                ⚠️ Please respond immediately and contact emergency services if necessary.
              </p>
            </div>
            
            <p style="margin: 20px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
              This is an automated emergency alert from the Voice Controlled Wheelchair system.
            </p>
          </div>
        </div>
      `;

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailConfig.emergencyEmail,
          subject: subject,
          text: text,
          html: html,
          location: location
        }),
      });

      const result = await response.json();

      if (result.success) {
        addLog('Emergency email sent successfully', 'status');
      } else {
        addLog(`Failed to send emergency email: ${result.error}`, 'error');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      addLog(`Email error: ${errorMsg}`, 'error');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const testEmailConfig = async () => {
    if (!isEmailConfigured) {
      addLog('Please configure email settings first', 'error');
      return;
    }

    setIsSendingEmail(true);
    addLog('Testing email configuration...', 'status');

    try {
      const subject = '🧪 Email Test - Voice Controlled Wheelchair';
      const text = `
This is a test email from the Voice Controlled Wheelchair system.

If you receive this email, the email configuration is working correctly.

Test Details:
- Time: ${new Date().toLocaleString()}
- System: Voice Controlled Wheelchair
- Purpose: Configuration Test

This is an automated test email.
      `;

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
          <div style="background-color: #17a2b8; color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">🧪 Email Test</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Voice Controlled Wheelchair</p>
          </div>
          
          <div style="background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #17a2b8;">
            <p style="margin: 0 0 15px 0; font-size: 16px; color: #333;">
              This is a test email from the Voice Controlled Wheelchair system.
            </p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #d1ecf1; border: 1px solid #bee5eb; border-radius: 4px;">
              <p style="margin: 0; color: #0c5460; font-weight: bold;">
                ✅ If you receive this email, the email configuration is working correctly.
              </p>
            </div>
            
            <h3 style="color: #17a2b8; margin: 20px 0 10px 0;">Test Details:</h3>
            <ul style="color: #333; line-height: 1.6;">
              <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
              <li><strong>System:</strong> Voice Controlled Wheelchair</li>
              <li><strong>Purpose:</strong> Configuration Test</li>
            </ul>
            
            <p style="margin: 20px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
              This is an automated test email.
            </p>
          </div>
        </div>
      `;

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailConfig.emergencyEmail,
          subject: subject,
          text: text,
          html: html
        }),
      });

      const result = await response.json();

      if (result.success) {
        addLog('Test email sent successfully', 'status');
      } else {
        addLog(`Failed to send test email: ${result.error}`, 'error');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      addLog(`Test email error: ${errorMsg}`, 'error');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const saveEmailConfig = () => {
    const config = {
      emergencyEmail: emailConfig.emergencyEmail
    };
    
    if (!config.emergencyEmail) {
      addLog('Please enter the emergency email address', 'error');
      return;
    }
    
    setEmailConfig(config);
    localStorage.setItem('emailConfig', JSON.stringify(config));
    setIsEmailConfigured(true);
    addLog('Emergency email configuration saved successfully', 'status');
  };

  const formatAccuracy = (accuracy: number) => {
    if (accuracy < 10) return `${accuracy.toFixed(1)}m`;
    if (accuracy < 100) return `${accuracy.toFixed(0)}m`;
    return `${(accuracy / 1000).toFixed(1)}km`;
  };

  return {
    emailConfig,
    setEmailConfig,
    isEmailConfigured,
    isSendingEmail,
    sendEmergencyEmail,
    testEmailConfig,
    saveEmailConfig
  };
};
