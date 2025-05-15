
// //index.js
// import React, { useState } from "react";
// import {
//   Text,
//   View,
//   TextInput,
//   Button,
//   ActivityIndicator,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   Keyboard,
// } from "react-native";

// const API_KEY = "c2c37528cca3a500aad7edf43cf97e88";

// //  background image URL or local asset
// const BACKGROUND_IMAGE = {
//   uri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", 
// };

// const Weather = () => {
//   const [city, setCity] = useState("");
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSearch = async () => {
//     if (city.trim() === "") return;
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setWeatherData(data);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError("Failed to fetch weather data.");
//     } finally {
//       setLoading(false);
//       Keyboard.dismiss();
//     }
//   };

//   return (
//     <ImageBackground
//       source={BACKGROUND_IMAGE}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>Weather Finder</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter city name"
//           value={city}
//           onChangeText={setCity}
//           onSubmitEditing={handleSearch}
//         />
//         <Button title="Get Weather" onPress={handleSearch} />

//         {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

//         {error && <Text style={styles.error}>Error: {error}</Text>}

//         {weatherData && (
//           <View style={styles.weatherBox}>
//             <Text style={styles.resultTitle}>{weatherData.name}</Text>
//             <Text>Temperature: {Math.round(weatherData.main.temp)}°C</Text>
//             <Text>Feels Like: {Math.round(weatherData.main.feels_like)}°C</Text>
//             <Text>Condition: {weatherData.weather[0].description}</Text>
//             <Image
//               source={{
//                 uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
//               }}
//               style={{ width: 100, height: 100, marginTop: 10 }}
//             />
//             <Text style={{ marginTop: 10, fontStyle: "italic" }}>
//               {new Date().toLocaleString()}
//             </Text>
//           </View>
//         )}
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.8)", // translucent white overlay for readability
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "100%",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//   },
//   weatherBox: {
//     marginTop: 20,
//     padding: 15,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     backgroundColor: "#f0f8ff",
//     width: "100%",
//     alignItems: "center",
//   },
//   resultTitle: { fontSize: 22, fontWeight: "bold" },
//   error: { color: "red", marginTop: 10 },
// });

// export default Weather;
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   Keyboard,
// } from "react-native";
// import { Button } from "react-native-paper";

// const API_KEY = "c2c37528cca3a500aad7edf43cf97e88";

// const BACKGROUND_IMAGE = {
//   uri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
// };

// const Weather = () => {
//   const [cityQuery, setCityQuery] = useState("");
//   const [citySuggestions, setCitySuggestions] = useState([]);
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleCitySearch = async (query) => {
//     setCityQuery(query);
//     if (query.length < 2) {
//       setCitySuggestions([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
//       );
//       const data = await response.json();

//       if (Array.isArray(data)) {
//         const suggestions = data.map((item) => ({
//           name: `${item.name}${item.state ? `, ${item.state}` : ""}, ${
//             item.country
//           }`,
//           lat: item.lat,
//           lon: item.lon,
//         }));
//         setCitySuggestions(suggestions);
//       } else {
//         setCitySuggestions([]);
//         console.error("Invalid data structure:", data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch city suggestions:", err);
//       setCitySuggestions([]);
//     }
//   };

//   const handleCitySelect = async (city) => {
//     setCityQuery(city.name);
//     setCitySuggestions([]);
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${API_KEY}`
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setWeatherData(data);
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError("Failed to fetch weather data.");
//     } finally {
//       setLoading(false);
//       Keyboard.dismiss();
//     }
//   };

//   return (
//     <ImageBackground
//       source={BACKGROUND_IMAGE}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <View style={styles.overlay}>
//         <Text style={styles.title}>Weather Finder</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter city"
//           value={cityQuery}
//           onChangeText={handleCitySearch}
//         />

//         {citySuggestions.length > 0 && (
//           <FlatList
//             data={citySuggestions}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() => handleCitySelect(item)}
//                 style={styles.suggestionItem}
//               >
//                 <Text>{item.name}</Text>
//               </TouchableOpacity>
//             )}
//             style={styles.suggestions}
//           />
//         )}

//         <Button
//           mode="contained"
//           onPress={() => handleCitySearch(cityQuery)}
//           style={styles.button}
//         >
//           Get Weather
//         </Button>

//         {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

//         {error && <Text style={styles.error}>Error: {error}</Text>}

//         {weatherData && (
//           <View style={styles.weatherBox}>
//             <Text style={styles.resultTitle}>{weatherData.name}</Text>
//             <Text>Temperature: {Math.round(weatherData.main.temp)}°C</Text>
//             <Text>Feels Like: {Math.round(weatherData.main.feels_like)}°C</Text>
//             <Text>Condition: {weatherData.weather[0].description}</Text>
//             <Image
//               source={{
//                 uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
//               }}
//               style={{ width: 100, height: 100, marginTop: 10 }}
//             />
//             <Text style={{ marginTop: 10, fontStyle: "italic" }}>
//               {new Date().toLocaleString()}
//             </Text>
//           </View>
//         )}
//       </View>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(255, 255, 255, 0.85)",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     width: "100%",
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//   },
//   suggestions: {
//     width: "100%",
//     backgroundColor: "#f9f9f9",
//     maxHeight: 150,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 5,
//     marginTop: 5,
//   },
//   suggestionItem: {
//     padding: 10,
//     borderBottomColor: "#ddd",
//     borderBottomWidth: 1,
//   },
//   button: {
//     marginTop: 10,
//     width: "100%",
//   },
//   weatherBox: {
//     marginTop: 20,
//     padding: 15,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     backgroundColor: "#f0f8ff",
//     width: "100%",
//     alignItems: "center",
//   },
//   resultTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   error: {
//     color: "red",
//     marginTop: 10,
//   },
// });

// export default Weather;




/////////////////////////////////////////

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  ImageBackground,
  Keyboard,
} from "react-native";
import { Button } from "react-native-paper";
import { useLazyQuery } from "@apollo/client";
import client from "../apollo";
import { GET_CITY_SUGGESTIONS, GET_CITY_WEATHER } from "../queries";
import { ApolloProvider } from "@apollo/client";

const BACKGROUND_IMAGE = {
  uri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
};

const WeatherApp = () => {
  const [cityQuery, setCityQuery] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [fetchCities, { loading: citiesLoading }] = useLazyQuery(
    GET_CITY_SUGGESTIONS,
    {
      onCompleted: (data) => {
        if (data?.getCitySuggestions) {
          setCitySuggestions(data.getCitySuggestions);
          setDropdownVisible(true);
        }
      },
      onError: (error) => {
        console.error("City suggestion error", error);
        setCitySuggestions([]);
        setDropdownVisible(false);
      },
      fetchPolicy: "no-cache",
    }
  );

  const [fetchWeather, { loading: weatherLoading }] = useLazyQuery(
    GET_CITY_WEATHER,
    {
      onCompleted: (data) => {
        if (data?.getCityWeather) {
          setWeatherData(data.getCityWeather);
        }
      },
      onError: (error) => {
        console.error("Weather fetch error", error);
        setWeatherData(null);
      },
      fetchPolicy: "no-cache",
    }
  );

  const handleCitySearch = (query) => {
    setCityQuery(query);
    setWeatherData(null);
    if (query.length < 2) {
      setCitySuggestions([]);
      setDropdownVisible(false);
      return;
    }
    fetchCities({ variables: { name: query } });
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCityQuery(city.name);
    setCitySuggestions([]);
    setDropdownVisible(false);
    Keyboard.dismiss();
    fetchWeather({ variables: { lat: city.lat, lon: city.lon } });
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
          placeholder="Enter city"
          value={cityQuery}
          onChangeText={handleCitySearch}
        />

        {dropdownVisible && citySuggestions.length > 0 && (
          <FlatList
            data={citySuggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleCitySelect(item)}
                style={styles.suggestionItem}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestions}
          />
        )}

        {citiesLoading && <ActivityIndicator style={{ marginTop: 10 }} />}

        <Button
          mode="contained"
          onPress={() => {
            if (selectedCity) {
              fetchWeather({
                variables: { lat: selectedCity.lat, lon: selectedCity.lon },
              });
            }
          }}
          style={styles.button}
          disabled={!selectedCity}
        >
          Get Weather
        </Button>

        {weatherLoading && <ActivityIndicator style={{ marginTop: 20 }} />}

        {weatherData && (
          <View style={styles.weatherBox}>
            <Text style={styles.resultTitle}>{selectedCity?.name}</Text>
            <Text>Temperature: {Math.round(weatherData.temperature)}°C</Text>
            <Text>Feels Like: {Math.round(weatherData.feelsLike)}°C</Text>
            <Text>Condition: {weatherData.description}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`,
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
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  suggestions: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    maxHeight: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 10,
    width: "100%",
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
  resultTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <WeatherApp />
    </ApolloProvider>
  );
}
