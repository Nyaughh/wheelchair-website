#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

// WiFi credentials
const char* ssid = "Komorebi";
const char* password = "valdle.com";

// Motor pins
#define IN1 D1
#define IN2 D2
#define IN3 D6
#define IN4 D7

#define BUZZER D0
#define EMERGENCY_BUTTON D5

// Ultrasonic sensor pins
#define TRIG_PIN D4
#define ECHO_PIN D8

// Button state variables
bool lastEmergencyButtonState = HIGH;
bool emergencyButtonPressed = false;
unsigned long lastEmergencyButtonTime = 0;
const unsigned long DEBOUNCE_DELAY = 50;
bool obstacleAlertActive = false;
const int OBSTACLE_ON_CM = 20;
const int OBSTACLE_OFF_CM = 25;
int motorSpeed = 255;
const int MIN_SPEED = 100;
const int MAX_SPEED = 255;

// Configuration
const char* emailApiUrl = "http://192.168.1.7:3000/api/send-email";
const char* emergencyEmail = "aarin@kmrb.tech";
const char* locationApiUrl = "http://192.168.1.7:3000/api/location/latest";

WiFiServer server(80);
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
  
  // Ultrasonic sensor
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

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
  long distance = getDistance();
  if (distance > 0) {
    if (!obstacleAlertActive && distance < OBSTACLE_ON_CM) {
      obstacleAlertActive = true;
      digitalWrite(BUZZER, HIGH);
    } else if (obstacleAlertActive && distance > OBSTACLE_OFF_CM) {
      obstacleAlertActive = false;
      digitalWrite(BUZZER, LOW);
    }
  }

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

  Serial.println(request);

  String headers =
    "HTTP/1.1 200 OK\r\n"
    "Access-Control-Allow-Origin: *\r\n"
    "Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n"
    "Access-Control-Allow-Headers: Content-Type\r\n"
    "Content-Type: text/plain\r\n"
    "Connection: close\r\n"
    "Content-Length: ";

  String response = "";

  if (request.indexOf("OPTIONS") >= 0) {
    response = "OK";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("GET / ") != -1 || request.indexOf("GET / HTTP") != -1) {
    response = "Wheelchair Controller Online";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("/forward") != -1) {
    forward();
    response = "Moving Forward";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("/back") != -1) {
    backward();
    response = "Moving Backward";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("/left") != -1) {
    left();
    response = "Turning Left";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("/right") != -1) {
    right();
    response = "Turning Right";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("/stop") != -1) {
    stopMotor();
    response = "Stopped";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("/speed_up") != -1) {
    if (motorSpeed < MAX_SPEED) {
      motorSpeed += 25;
      if (motorSpeed > MAX_SPEED) motorSpeed = MAX_SPEED;
    }
    response = "Speed: " + String(motorSpeed);
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("/speed_down") != -1) {
    if (motorSpeed > MIN_SPEED) {
      motorSpeed -= 25;
      if (motorSpeed < MIN_SPEED) motorSpeed = MIN_SPEED;
    }
    response = "Speed: " + String(motorSpeed);
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("/emergency") != -1) {
    emergency();
    response = "Emergency Alert Activated";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else if (request.indexOf("/buzzer") != -1) {
    buzzer();
    response = "Buzzer Activated";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  } else {
    response = "Unknown Command";
    incomingClient.print(headers + String(response.length()) + "\r\n\r\n" + response);
  }

  delay(1);
  incomingClient.stop();
}

// Motor Control
void forward() {
  analogWrite(IN1, motorSpeed);
  digitalWrite(IN2, LOW);
  analogWrite(IN3, motorSpeed);
  digitalWrite(IN4, LOW);
}

void backward() {
  digitalWrite(IN1, LOW);
  analogWrite(IN2, motorSpeed);
  digitalWrite(IN3, LOW);
  analogWrite(IN4, motorSpeed);
}

void left() {
  analogWrite(IN1, motorSpeed);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  analogWrite(IN4, motorSpeed);
}

void right() {
  digitalWrite(IN1, LOW);
  analogWrite(IN2, motorSpeed);
  analogWrite(IN3, motorSpeed);
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
  digitalWrite(BUZZER, HIGH);
  sendEmergencyEmail();

  while (digitalRead(EMERGENCY_BUTTON) == LOW) {
    digitalWrite(BUZZER, HIGH);
    delay(100);
    digitalWrite(BUZZER, LOW);
    delay(100);
  }
}

void buzzer() {
  for (int i = 0; i < 10; i++) {
    digitalWrite(BUZZER, HIGH);
    delay(100);
    digitalWrite(BUZZER, LOW);
    delay(100);
  }
}

// Ultrasonic Distance Measurement
long getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 30000); // 30ms timeout
  long distance = duration * 0.034 / 2; // cm
  return distance;
}

// Email Sending
void sendEmergencyEmail() {
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("WiFi connected. Attempting to send email...");
    Serial.println("Target URL: " + String(emailApiUrl));

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

    if (response.indexOf("\"success\":true") > 0) {
      int latIndex = response.indexOf("\"latitude\":");
      int lonIndex = response.indexOf("\"longitude\":");
      int addrIndex = response.indexOf("\"address\":");
      int timeIndex = response.indexOf("\"timestamp\":");

      if (latIndex > 0 && lonIndex > 0) {
        int latStart = response.indexOf(":", latIndex) + 1;
        int latEnd = response.indexOf(",", latStart);
        String latitude = response.substring(latStart, latEnd);

        int lonStart = response.indexOf(":", lonIndex) + 1;
        int lonEnd = response.indexOf(",", lonStart);
        String longitude = response.substring(lonStart, lonEnd);

        String timestamp = "";
        if (timeIndex > 0) {
          int timeStart = response.indexOf(":", timeIndex) + 1;
          int timeEnd = response.indexOf(",", timeStart);
          timestamp = response.substring(timeStart, timeEnd);
        }

        String address = "";
        if (addrIndex > 0) {
          int addrStart = response.indexOf("\"", addrIndex + 10) + 1;
          int addrEnd = response.indexOf("\"", addrStart);
          address = response.substring(addrStart, addrEnd);
        }

        String locationInfo = latitude + ", " + longitude;
        if (address.length() > 0) locationInfo += " (" + address + ")";
        if (timestamp.length() > 0) locationInfo += " [Updated: " + timestamp + "]";

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


