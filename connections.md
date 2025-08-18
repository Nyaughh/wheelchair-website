# NodeMCU Wheelchair Controller - Hardware Connections

## Pin Definitions

Based on the `nodemcucode.ino` file, here are the pin assignments and connections:

### Motor Control Pins

- **IN1**: `D1` - Motor control pin 1
- **IN2**: `D2` - Motor control pin 2

### Audio/Alert Pins

- **BUZZER**: `D7` - Buzzer for emergency alerts

### Input Pins

- **EMERGENCY_BUTTON**: `D5` - Emergency button (with internal pull-up resistor)

## Connection Details

### Motor Driver Connections

```
NodeMCU D1 (IN1) → Motor Driver IN1
NodeMCU D2 (IN2) → Motor Driver IN2
```

### Motor Connections

```
Motor Driver OUT1 → Motor Terminal 1
Motor Driver OUT2 → Motor Terminal 2
```

### Motor Driver Power

```
12V Power Supply → Motor Driver VM (Motor Voltage)
5V Power Supply → Motor Driver VCC (Logic Voltage)
GND → Motor Driver GND
```

### Emergency Button

```
NodeMCU D5 → Emergency Button (with internal pull-up)
GND → Emergency Button (other terminal)
```

### Buzzer

```
NodeMCU D7 → Buzzer positive terminal
GND → Buzzer negative terminal
```

### Power Connections

```
VIN/5V → Motor Driver VCC
GND → Motor Driver GND
```

## Motor Control Logic

- **Forward**: IN1 = HIGH, IN2 = LOW
- **Backward**: IN1 = LOW, IN2 = HIGH
- **Stop**: IN1 = LOW, IN2 = LOW

## Motor Specifications

- **Motor Type**: DC Motor (typically 12V)
- **Control Method**: H-Bridge via Motor Driver
- **Speed Control**: On/Off (no PWM speed control in current implementation)
- **Direction Control**: Bidirectional (forward/backward)

## Power Requirements

- **Motor Voltage**: 12V DC
- **Logic Voltage**: 5V DC (for NodeMCU and motor driver logic)
- **Current Rating**: Depends on motor specifications (typically 1-5A)
- **Power Supply**: Separate 12V supply for motors, 5V for logic

## Network Configuration

- **WiFi SSID**: "Komorebi"
- **WiFi Password**: "valdle.com"
- **Server Port**: 80

## API Endpoints

The NodeMCU serves these HTTP endpoints:

- `GET /` - Status check
- `GET /forward` - Move forward
- `GET /back` - Move backward
- `GET /stop` - Stop motor
- `GET /emergency` - Trigger emergency alert

## External API Connections

- **Email API**: `http://192.168.1.7:3000/api/send-email`
- **Location API**: `http://192.168.1.7:3000/api/location/latest`
- **Emergency Email**: `aarin@kmrb.tech`

## Hardware Components

- **NodeMCU ESP8266**: Main microcontroller
- **L298N Motor Driver**: H-bridge motor controller
- **12V DC Motor**: Wheelchair drive motor
- **5V Buzzer**: Emergency alert sound
- **Push Button**: Emergency stop button
- **12V Power Supply**: For motor power
- **5V Power Supply**: For logic circuits

## Safety Features

- **Emergency Stop**: Physical button for immediate stop
- **Automatic Stop**: Motor stops when no command is received
- **Audio Alert**: Buzzer sounds during emergency activation
- **Email Notification**: Automatic emergency alerts with location data

## Notes

- The emergency button uses internal pull-up resistor (INPUT_PULLUP)
- The buzzer provides audio feedback during emergency alerts
- All HTTP responses include CORS headers for web compatibility
- The system automatically sends emergency emails with location data when the emergency button is pressed
- **Important**: Always use separate power supplies for motor and logic circuits to prevent voltage spikes
- **Safety**: Test emergency stop functionality before each use
