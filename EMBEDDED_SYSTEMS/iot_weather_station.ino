#include <DHT.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <LiquidCrystal_I2C.h>
DHT dht(2, DHT11);   // D4
#define BUZZER 12    // D6
#define REDPIN 14    // D5
#define GREENPIN 16  // D0
// SDA  - D2
// SCL - D1
LiquidCrystal_I2C lcd(0x27, 16, 2);
const char* ssid = "RCA-WiFii";
const char* password = "@rca@2023";
const char* serverAddress = "http://192.168.1.150";
void setup() {
    Serial.begin(115200);
    Serial.println("DHT11 Temperature and Humidity Sensor");
    dht.begin();
    pinMode(BUZZER, OUTPUT);
    pinMode(REDPIN, OUTPUT);
    pinMode(GREENPIN, OUTPUT);
    // Initialize the LCD display
    lcd.begin(16, 2);
    lcd.init();
    lcd.backlight();
    connectToWiFi();
}
void loop() {
    delay(10000);  // Wait for 10 seconds between readings
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    if (isnan(temperature) || isnan(humidity)) {
        Serial.println("Failed to read data from DHT sensor");
    } else {
        Serial.print("Temperature: ");
        Serial.print(temperature);
        Serial.print(" °C");
        Serial.println("");
        Serial.print("Humidity: ");
        Serial.print(humidity);
        Serial.println(" %");
        // Display temperature on the LCD
        lcd.setCursor(0, 0);
        lcd.print("Temp: ");
        lcd.print(temperature);
        lcd.print(" ");
        // Display the humidity on LCD
        lcd.setCursor(0, 1);
        lcd.print("Humidity: ");
        lcd.print("");
        lcd.print(humidity);
        lcd.print(" ");
        // Upload data to the server
        if (temperature > 25) {
            digitalWrite(GREENPIN, LOW);
            digitalWrite(REDPIN, HIGH);
            for (int i = 0; i < 10; i++) {
                digitalWrite(BUZZER, HIGH);
                delay(100);
                digitalWrite(BUZZER, LOW);
                delay(100);
            }
            Serial.println("Students should remove pullovers!");
        } else {
            digitalWrite(REDPIN, LOW);
            digitalWrite(GREENPIN, HIGH);
            digitalWrite(BUZZER, LOW);
            Serial.println("Students can wear pullovers!");
        }
    }
    // Upload data to the server
    sendDataToServer(temperature, humidity);
}
void connectToWiFi() {
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void sendDataToServer(float temperature, float humidity) {
    WiFiClient client;
    HTTPClient http;
    // Build the URL with query parameters
    String url = serverAddress;
    url += "/weather-station/backend.php";
    url += "?temperature=" + String(temperature);
    url += "&humidity=" + String(humidity);
    url += "&device=340722SPE05420";
    // Send HTTP GET request
    http.begin(client, url);
    http.setTimeout(10000);  // Set timeout to 10 seconds (for example)
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
    } else {
        Serial.println("Error sending data to server");
    }
    http.end();
}