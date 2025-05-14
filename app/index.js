//index.js
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
  Keyboard,
} from "react-native";

const API_KEY = "c2c37528cca3a500aad7edf43cf97e88";

//  background image URL or local asset
const BACKGROUND_IMAGE = {
  uri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", 
};

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (city.trim() === "") return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
      Keyboard.dismiss();
    }
  };

  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Weather Finder</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
        />
        <Button title="Get Weather" onPress={handleSearch} />

        {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

        {error && <Text style={styles.error}>Error: {error}</Text>}

        {weatherData && (
          <View style={styles.weatherBox}>
            <Text style={styles.resultTitle}>{weatherData.name}</Text>
            <Text>Temperature: {Math.round(weatherData.main.temp)}°C</Text>
            <Text>Feels Like: {Math.round(weatherData.main.feels_like)}°C</Text>
            <Text>Condition: {weatherData.weather[0].description}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
              }}
              style={{ width: 100, height: 100, marginTop: 10 }}
            />
            <Text style={{ marginTop: 10, fontStyle: "italic" }}>
              {new Date().toLocaleString()}
            </Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // translucent white overlay for readability
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  weatherBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f0f8ff",
    width: "100%",
    alignItems: "center",
  },
  resultTitle: { fontSize: 22, fontWeight: "bold" },
  error: { color: "red", marginTop: 10 },
});

export default Weather;
