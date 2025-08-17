# Location Database Setup Guide

## Overview

This system provides a database to store location information from GPS-enabled devices (like web browsers) so that devices without GPS capabilities (like NodeMCU) can access the last known location when sending emergency alerts.

## How It Works

1. **GPS Devices** (Web browsers) automatically save location data to the database when GPS is obtained
2. **Non-GPS Devices** (NodeMCU) can fetch the latest location from the database when sending emergency emails
3. **Location History** is maintained for tracking and debugging purposes

## Database Structure

The system uses a JSON file-based database (`data/locations.json`) with the following structure:

```json
[
  {
    "id": 1734523456789,
    "latitude": 40.7128,
    "longitude": -74.006,
    "accuracy": 10.5,
    "timestamp": 1734523456789,
    "address": "123 Main St, New York, NY",
    "device_id": "web",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
]
```

## API Endpoints

### 1. Save Location

- **POST** `/api/location/save`
- **Purpose**: Save new location data to database
- **Body**:
  ```json
  {
    "latitude": 40.7128,
    "longitude": -74.006,
    "accuracy": 10.5,
    "timestamp": 1734523456789,
    "address": "123 Main St, New York, NY",
    "device_id": "web"
  }
  ```

### 2. Get Latest Location

- **GET** `/api/location/latest`
- **Purpose**: Retrieve the most recent location data
- **Query Parameters**:
  - `device_id` (optional): Filter by specific device

### 3. Get Location History

- **GET** `/api/location/history`
- **Purpose**: Retrieve location history
- **Query Parameters**:
  - `limit` (optional): Number of records to return (default: 10)
  - `device_id` (optional): Filter by specific device

### 4. Test Database

- **GET** `/api/location/test`
- **Purpose**: Check database status and statistics
- **POST** `/api/location/test`
- **Purpose**: Add a test location record

## Configuration

### 1. Environment Setup

No additional environment variables are required. The database file is automatically created in the `data/` directory.

### 2. NodeMCU Configuration

Update the NodeMCU code with the correct API URLs:

```cpp
// In nodemcucode.ino
const char* emailApiUrl = "http://192.168.1.7:3000/api/send-email";
const char* locationApiUrl = "http://192.168.1.7:3000/api/location/latest";
```

### 3. Web Application

The web application automatically saves location data when GPS is obtained. No additional configuration needed.

## Usage Examples

### Testing the Database

1. **Check Database Status**:

   ```bash
   curl http://localhost:3000/api/location/test
   ```

2. **Add Test Location**:

   ```bash
   curl -X POST http://localhost:3000/api/location/test
   ```

3. **Get Latest Location**:
   ```bash
   curl http://localhost:3000/api/location/latest
   ```

### NodeMCU Integration

The NodeMCU automatically:

1. Fetches the latest location when emergency button is pressed
2. Includes location data in emergency emails
3. Provides fallback if no location data is available

## Data Management

### Automatic Cleanup

The system includes functions to clean up old location data:

```typescript
// Delete locations older than 30 days
await deleteOldLocations(30);
```

### Manual Database Management

- **Location**: `data/locations.json`
- **Backup**: Copy the file before making changes
- **Reset**: Delete the file to start fresh

## Security Considerations

1. **File Permissions**: Ensure the `data/` directory has appropriate read/write permissions
2. **Network Security**: The API endpoints are accessible on your local network
3. **Data Privacy**: Location data is stored locally and not transmitted to external services

## Troubleshooting

### Common Issues

1. **Database File Not Created**:

   - Check that the `data/` directory exists
   - Ensure write permissions for the application

2. **NodeMCU Can't Fetch Location**:

   - Verify the API URL is correct
   - Check that the Next.js server is running
   - Ensure both devices are on the same network

3. **Location Data Not Saving**:
   - Check browser console for errors
   - Verify GPS permissions are granted
   - Check network connectivity

### Debug Commands

```bash
# Check if server is running
curl http://localhost:3000/api/location/test

# View database file
cat data/locations.json

# Check file permissions
ls -la data/
```

## Performance Notes

- **File Size**: The JSON database grows with each location entry
- **Read Performance**: For large datasets, consider implementing pagination
- **Write Performance**: Each save operation rewrites the entire file
- **Memory Usage**: All location data is loaded into memory

## Future Enhancements

1. **SQLite Integration**: For better performance with large datasets
2. **Data Compression**: Reduce file size for long-term storage
3. **Real-time Updates**: WebSocket integration for live location sharing
4. **Geofencing**: Automatic alerts when entering/leaving specific areas
5. **Location Analytics**: Usage patterns and movement tracking
