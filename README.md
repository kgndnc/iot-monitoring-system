# Environmental Monitoring System for Smart Cities

## Introduction

The aim of this project is to develop an Environmental Monitoring System for smart cities
seeking to enhance their environmental sustainability and respond effectively to various
conditions. Throughout the city, a network of distributed sensors will measure some
environmental parameters like noise pollution, air quality, temperature, humidity etc.

The API at the core of this project will have functionalities such as sensor registration,
real-time data collection from sensors, data processing for anomaly detection, alert
generation if there are anomalies, data transmission upon request etc. For testing
purposes, mock data will be fabricated, or historical data will be used.

By employing this system, city officials can make informed decisions in real-time,
addressing environmental challenges promptly. Also, citizens can benefit from a healthier
and more comfortable urban environment.

## Endpoints

1. `POST /sensors`: Register a new sensor with its metadata.
2. `POST /data`: Submit sensor data to the system.
3. `GET /data/{sensor_id}`: Retrieve data from a specific sensor.
4. `GET /data?start_date={start_date}&end_date={end_date}`: Retrieve data within a
specified date range.
5. `GET /sensors/{sensor_id}`: Retrieve information about a specific sensor.
6. `GET /sensors/{sensor_id}/status`: Check the status of a sensor (online/offline).
7. `POST /process`: Initiate data processing for a specific set of sensors.
8. `GET /analytics/{metric}`: Retrieve analytics or aggregated data for a specific metric.
9. `GET /alerts`: Retrieve alerts for abnormal sensor readings.
10. `GET /config`: Retrieve system configuration settings.
11. `PUT /config`: Update system configuration settings.

## Setup
Inside the project folder you can run 
`docker build -t node-app .`
to build the image.

And then
```bash
cd docker
docker compose up
```
to start the application with the services configured in [`docker-compose.yml`](https://github.com/kgndnc/iot-monitoring-system/blob/main/docker/docker-compose.yml) file.

## Containerized Services
There are 3 services:
- Node.js app (node-app)
- Database (mongo)
- Database admin interface (mongo-express)
