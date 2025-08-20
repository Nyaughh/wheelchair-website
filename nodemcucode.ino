#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

const char* ssid = "Komorebi";
const char* password = "valdle.com";

// Motor pins
#define IN1 D1
#define IN2 D2
#define IN3 D6
#define IN4 D7
#define BUZZER D0
#define EMERGENCY_BUTTON D5

// Button state variables
bool lastEmergencyButtonState = HIGH;
bool emergencyButtonPressed = false;
unsigned long lastEmergencyButtonTime = 0;
const unsigned long DEBOUNCE_DELAY = 50;

// configuration

const char* emailApiUrl = "http://192.168.1.7:3000/api/send-email";
const char* emergencyEmail = "aarin@kmrb.tech";
const char* locationApiUrl = "http://192.168.1.7:3000/api/location/latest";

WiFiServer server(80);4444
WiFiClient httpClient;
HTTPClient http;

void setup() {
  Serial.begin(115200);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(EMERGENCY_BUTTON, INPUT_PULLUP);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected!");
  Serial.println(WiFi.localIP());

  server.begin();
}

void loop() {
  // Handle emergency button with debouncing
  bool currentEmergencyButtonState = digitalRead(EMERGENCY_BUTTON);
  
  if (currentEmergencyButtonState != lastEmergencyButtonState) {
    lastEmergencyButtonTime = millis();
  }
  
  if ((millis() - lastEmergencyButtonTime) > DEBOUNCE_DELAY) {
    if (currentEmergencyButtonState == LOW && !emergencyButtonPressed) {
      emergencyButtonPressed = true;
      emergency();
    } else if (currentEmergencyButtonState == HIGH) {
      emergencyButtonPressed = false;
    }
  }
  
  lastEmergencyButtonState = currentEmergencyButtonState;
  
  WiFiClient incomingClient = server.available();
  if (!incomingClient) return;

  // Wait for client to send data
  unsigned long timeout = millis() + 3000;
  while (!incomingClient.available() && millis() < timeout) {
    delay(1);
  }
  
  if (!incomingClient.available()) {
    incomingClient.stop();
    return;
  }

  String request = incomingClient.readStringUntil('\r');
  incomingClient.flush();

  Serial.println(request); // log request for debugging

  // Default headers for all responses
  String headers =
    "HTTP/1.1 200 OK\r\n"
    "Access-Control-Allow-Origin: *\r\n"
    "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n"
    "Access-Control-Allow-Headers: Content-Type\r\n"
    "Content-Type: text/plain\r\n"
    "Connection: close\r\n"
    "Content-Length: ";

  String response = "";

  // Handle preflight OPTIONS request
  if (request.indexOf("OPTIONS") >= 0) {
    response = "OK";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }
  // Command handling
  else if (request.indexOf("GET / ") != -1 || request.indexOf("GET / HTTP") != -1) {
    // Root endpoint for ping
    response = "Wheelchair Controller Online";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }
  else if (request.indexOf("/forward") != -1) {
    forward();
    response = "Moving Forward";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }
  else if (request.indexOf("/back") != -1) {
    backward();
    response = "Moving Backward";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }
  else if (request.indexOf("/left") != -1) {
    left();
    response = "Turning Left";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }
  else if (request.indexOf("/right") != -1) {
    right();
    response = "Turning Right";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }
  else if (request.indexOf("/stop") != -1) {
    stopMotor();
    response = "Stopped";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }
  else if (request.indexOf("/emergency") != -1) {
    emergency();
    response = "Emergency Alert Activated";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }
  else if (request.indexOf("/buzzer") != -1) {
    buzzer();
    response = "Buzzer Activated";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }
  else {
    response = "Unknown Command";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }

  // Give time for data to be sent
  delay(1);
  incomingClient.stop();
}

void forward() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void backward() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void left() {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
}

void right() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void stopMotor() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void emergency() {
  Serial.println("EMERGENCY BUTTON PRESSED!");
  stopMotor();
  
  // Send email immediately
  sendEmergencyEmail();
  
  // Keep buzzing until button is released
  while (digitalRead(EMERGENCY_BUTTON) == LOW) {
    digitalWrite(BUZZER, HIGH);
    delay(100);
    digitalWrite(BUZZER, LOW);
    delay(100);
  }
}

void sendEmergencyEmail() {
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi connected. Attempting to send email...");
    Serial.println("Target URL: " + String(emailApiUrl));
    
    // First, try to get the latest location from the database
    String locationInfo = getLatestLocationFromDatabase();
    
    http.begin(httpClient, emailApiUrl);
    http.setTimeout(7000);
    http.addHeader("Content-Type", "application/json");
    
    String currentTime = String(millis());
    String emailSubject = "🚨 EMERGENCY ALERT - Wheelchair User Needs Help";
    String emailText = "EMERGENCY ALERT\\n\\nA wheelchair user has triggered an emergency alert and needs immediate assistance.\\n\\nTime: " + currentTime + "ms\\n\\n";
    String emailHtml = "<div style=\\\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;\\\"><div style=\\\"background-color: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 20px;\\\"><h1 style=\\\"margin: 0; font-size: 24px;\\\">🚨 EMERGENCY ALERT</h1><p style=\\\"margin: 10px 0 0 0; font-size: 16px;\\\">Wheelchair User Needs Help</p></div><div style=\\\"background-color: white; padding: 20px; border-radius: 8px; border-left: 4px solid #dc3545;\\\"><p style=\\\"margin: 0 0 15px 0; font-size: 16px; color: #333;\\\">A wheelchair user has triggered an emergency alert and needs immediate assistance.</p><h3 style=\\\"color: #dc3545; margin: 20px 0 10px 0;\\\">Alert Details:</h3><ul style=\\\"color: #333; line-height: 1.6;\\\"><li><strong>Time:</strong> " + currentTime + "ms</li><li><strong>Source:</strong> NodeMCU Emergency Button</li><li><strong>Device:</strong> Voice Controlled Wheelchair</li>";
    
    if (locationInfo.length() > 0) {
      emailText += "Last Known Location: " + locationInfo + "\\n\\n";
      emailHtml += "<li><strong>Last Known Location:</strong> " + locationInfo + "</li>";
    }
    
    emailText += "Please respond immediately and contact emergency services if necessary.\\n\\nThis is an automated emergency alert from the Voice Controlled Wheelchair system.";
    emailHtml += "</ul><div style=\\\"margin: 20px 0; padding: 15px; background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px;\\\"><p style=\\\"margin: 0; color: #856404; font-weight: bold;\\\">⚠️ Please respond immediately and contact emergency services if necessary.</p></div><p style=\\\"margin: 20px 0 0 0; font-size: 12px; color: #666; font-style: italic;\\\">This is an automated emergency alert from the Voice Controlled Wheelchair system.</p></div></div>";
    
    String jsonPayload = "{\"to\":\"" + String(emergencyEmail) + "\",\"subject\":\"" + emailSubject + "\",\"text\":\"" + emailText + "\",\"html\":\"" + emailHtml + "\"}";
    
    Serial.println("Sending payload: " + jsonPayload);
    
    int httpResponseCode = http.POST(jsonPayload);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Email sent successfully. Response: " + response);
    } else {
      Serial.println("Error sending email. HTTP code: " + String(httpResponseCode));
      Serial.println("Error details: " + http.errorToString(httpResponseCode));
    }
    
    http.end();
  } else {
    Serial.println("WiFi not connected. Cannot send email.");
    Serial.println("WiFi status: " + String(WiFi.status()));
  }
}

String getLatestLocationFromDatabase() {
  Serial.println("Fetching latest location from: " + String(locationApiUrl));
  
  http.begin(httpClient, locationApiUrl);
  http.setTimeout(7000);
  int httpResponseCode = http.GET();
  
  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Location response: " + response);
    
    // Parse the JSON response to extract location info
    if (response.indexOf("\"success\":true") > 0) {
      // Extract coordinates
      int latIndex = response.indexOf("\"latitude\":");
      int lonIndex = response.indexOf("\"longitude\":");
      int addrIndex = response.indexOf("\"address\":");
      int timeIndex = response.indexOf("\"timestamp\":");
      
      if (latIndex > 0 && lonIndex > 0) {
        // Extract latitude
        int latStart = response.indexOf(":", latIndex) + 1;
        int latEnd = response.indexOf(",", latStart);
        if (latEnd == -1) latEnd = response.indexOf("}", latStart);
        String latitude = response.substring(latStart, latEnd);
        
        // Extract longitude
        int lonStart = response.indexOf(":", lonIndex) + 1;
        int lonEnd = response.indexOf(",", lonStart);
        if (lonEnd == -1) lonEnd = response.indexOf("}", lonStart);
        String longitude = response.substring(lonStart, lonEnd);
        
        // Extract timestamp
        String timestamp = "";
        if (timeIndex > 0) {
          int timeStart = response.indexOf(":", timeIndex) + 1;
          int timeEnd = response.indexOf(",", timeStart);
          if (timeEnd == -1) timeEnd = response.indexOf("}", timeStart);
          timestamp = response.substring(timeStart, timeEnd);
        }
        
        // Extract address if available
        String address = "";
        if (addrIndex > 0) {
          int addrStart = response.indexOf("\"", addrIndex + 10) + 1;
          int addrEnd = response.indexOf("\"", addrStart);
          if (addrEnd > addrStart) {
            address = response.substring(addrStart, addrEnd);
          }
        }
        
        String locationInfo = latitude + ", " + longitude;
        if (address.length() > 0) {
          locationInfo += " (" + address + ")";
        }
        if (timestamp.length() > 0) {
          locationInfo += " [Updated: " + timestamp + "]";
        }
        
        http.end();
        return locationInfo;
      }
    }
  } else {
    Serial.println("Error fetching location. HTTP code: " + String(httpResponseCode));
  }
  
  http.end();
  return "";
}

void buzzer() {
  for (int i = 0; i < 10; i++) {
    digitalWrite(BUZZER, HIGH);
    delay(100);
    digitalWrite(BUZZER, LOW);
    delay(100);
  }
}
