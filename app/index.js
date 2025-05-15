
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
// //index.js
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
// import { useLazyQuery } from "@apollo/client";
// import client from "../apollo";
// import { GET_CITY_SUGGESTIONS, GET_CITY_WEATHER } from "../queries";
// import { ApolloProvider } from "@apollo/client";

// const BACKGROUND_IMAGE = {
//   uri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
// };

// const WeatherApp = () => {
//   const [cityQuery, setCityQuery] = useState("");
//   const [citySuggestions, setCitySuggestions] = useState([]);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [weatherData, setWeatherData] = useState(null);
//   const [dropdownVisible, setDropdownVisible] = useState(false);

//   const [fetchCities, { loading: citiesLoading }] = useLazyQuery(
//     GET_CITY_SUGGESTIONS,
//     {
//       onCompleted: (data) => {
//         if (data?.getCitySuggestions) {
//           setCitySuggestions(data.getCitySuggestions);
//           setDropdownVisible(true);
//         }
//       },
//       onError: (error) => {
//         console.error("City suggestion error", error);
//         setCitySuggestions([]);
//         setDropdownVisible(false);
//       },
//       fetchPolicy: "no-cache",
//     }
//   );

//   const [fetchWeather, { loading: weatherLoading }] = useLazyQuery(
//     GET_CITY_WEATHER,
//     {
//       onCompleted: (data) => {
//         if (data?.getCityWeather) {
//           setWeatherData(data.getCityWeather);
//         }
//       },
//       onError: (error) => {
//         console.error("Weather fetch error", error);
//         setWeatherData(null);
//       },
//       fetchPolicy: "no-cache",
//     }
//   );

//   const handleCitySearch = (query) => {
//     setCityQuery(query);
//     setWeatherData(null);
//     if (query.length < 2) {
//       setCitySuggestions([]);
//       setDropdownVisible(false);
//       return;
//     }
//     fetchCities({ variables: { name: query } });
//   };

//   const handleCitySelect = (city) => {
//     setSelectedCity(city);
//     setCityQuery(city.name);
//     setCitySuggestions([]);
//     setDropdownVisible(false);
//     Keyboard.dismiss();
//     fetchWeather({ variables: { lat: city.lat, lon: city.lon } });
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

//         {dropdownVisible && citySuggestions.length > 0 && (
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

//         {citiesLoading && <ActivityIndicator style={{ marginTop: 10 }} />}

//         <Button
//           mode="contained"
//           onPress={() => {
//             if (selectedCity) {
//               fetchWeather({
//                 variables: { lat: selectedCity.lat, lon: selectedCity.lon },
//               });
//             }
//           }}
//           style={styles.button}
//           disabled={!selectedCity}
//         >
//           Get Weather
//         </Button>

//         {weatherLoading && <ActivityIndicator style={{ marginTop: 20 }} />}

//         {weatherData && (
//           <View style={styles.weatherBox}>
//             <Text style={styles.resultTitle}>{selectedCity?.name}</Text>
//             <Text>Temperature: {Math.round(weatherData.temperature)}°C</Text>
//             <Text>Feels Like: {Math.round(weatherData.feelsLike)}°C</Text>
//             <Text>Condition: {weatherData.description}</Text>
//             <Image
//               source={{
//                 uri: `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`,
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
// });

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <WeatherApp />
//     </ApolloProvider>
//   );
// }





// import React, { useState, useRef } from "react";
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
//   ScrollView,
// } from "react-native";
// import { Button } from "react-native-paper";
// import { useLazyQuery } from "@apollo/client";
// import client from "../apollo";
// import { GET_CITY_SUGGESTIONS, GET_CITY_WEATHER } from "../queries";
// import { ApolloProvider } from "@apollo/client";

// const BACKGROUND_IMAGE = {
//   uri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
// };

// const WeatherApp = () => {
//   const [cityQuery, setCityQuery] = useState("");
//   const [citySuggestions, setCitySuggestions] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [cityWeatherMap, setCityWeatherMap] = useState({});
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const pendingCityRef = useRef(null);

//   const [fetchCities, { loading: citiesLoading }] = useLazyQuery(
//     GET_CITY_SUGGESTIONS,
//     {
//       onCompleted: (data) => {
//         if (data?.getCitySuggestions) {
//           setCitySuggestions(data.getCitySuggestions);
//           setDropdownVisible(true);
//         }
//       },
//       onError: (error) => {
//         console.error("City suggestion error", error);
//         setCitySuggestions([]);
//         setDropdownVisible(false);
//       },
//       fetchPolicy: "no-cache",
//     }
//   );

//   const [fetchWeather, { loading: weatherLoading }] = useLazyQuery(
//     GET_CITY_WEATHER,
//     {
//       onCompleted: (data) => {
//         if (data?.getCityWeather && pendingCityRef.current) {
//           const { lat, lon } = pendingCityRef.current;
//           const cityKey = `${lat},${lon}`;
//           setCityWeatherMap((prev) => ({
//             ...prev,
//             [cityKey]: data.getCityWeather,
//           }));
//           pendingCityRef.current = null;
//         }
//       },
//       onError: (error) => {
//         console.error("Weather fetch error", error);
//         pendingCityRef.current = null;
//       },
//       fetchPolicy: "no-cache",
//     }
//   );

//   const handleCitySearch = (query) => {
//     setCityQuery(query);
//     if (query.length < 2) {
//       setCitySuggestions([]);
//       setDropdownVisible(false);
//       return;
//     }
//     fetchCities({ variables: { name: query } });
//   };

//   const handleCitySelect = (city) => {
//     const cityKey = `${city.lat},${city.lon}`;
//     if (!selectedCities.some((c) => `${c.lat},${c.lon}` === cityKey)) {
//       setSelectedCities((prev) => [...prev, city]);
//       pendingCityRef.current = city;
//       fetchWeather({ variables: { lat: city.lat, lon: city.lon } });
//     }
//     setCityQuery(city.name);
//     setCitySuggestions([]);
//     setDropdownVisible(false);
//     Keyboard.dismiss();
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

//         {dropdownVisible && citySuggestions.length > 0 && (
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

//         {citiesLoading && <ActivityIndicator style={{ marginTop: 10 }} />}

//         <ScrollView
//           style={{ width: "100%" }}
//           contentContainerStyle={{ paddingBottom: 50 }}
//         >
//           {selectedCities.map((city) => {
//             const cityKey = `${city.lat},${city.lon}`;
//             const weather = cityWeatherMap[cityKey];

//             return (
//               <View key={cityKey} style={styles.weatherBox}>
//                 <Text style={styles.resultTitle}>{city.name}</Text>
//                 {weather ? (
//                   <>
//                     <Text>
//                       Temperature: {Math.round(weather.temperature)}°C
//                     </Text>
//                     <Text>Feels Like: {Math.round(weather.feelsLike)}°C</Text>
//                     <Text>Condition: {weather.description}</Text>
//                     <Image
//                       source={{
//                         uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
//                       }}
//                       style={{ width: 100, height: 100, marginTop: 10 }}
//                     />
//                     <Text style={{ marginTop: 10, fontStyle: "italic" }}>
//                       {new Date().toLocaleString()}
//                     </Text>
//                   </>
//                 ) : (
//                   <ActivityIndicator style={{ marginTop: 10 }} />
//                 )}
//               </View>
//             );
//           })}
//         </ScrollView>
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
//     justifyContent: "flex-start",
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
// });

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <WeatherApp />
//     </ApolloProvider>
//   );
// }



// import React, { useState, useRef } from "react";
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
//   ScrollView,
// } from "react-native";
// import { Button } from "react-native-paper";
// import { useLazyQuery } from "@apollo/client";
// import client from "../apollo";
// import { GET_CITY_SUGGESTIONS, GET_CITY_WEATHER } from "../queries";
// import { ApolloProvider } from "@apollo/client";

// const BACKGROUND_IMAGE = {
//   uri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
// };

// const WeatherApp = () => {
//   const [cityQuery, setCityQuery] = useState("");
//   const [citySuggestions, setCitySuggestions] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [cityWeatherMap, setCityWeatherMap] = useState({});
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [lastSelectedCity, setLastSelectedCity] = useState(null);
//   const pendingCityRef = useRef(null);

//   const [fetchCities, { loading: citiesLoading }] = useLazyQuery(
//     GET_CITY_SUGGESTIONS,
//     {
//       onCompleted: (data) => {
//         setCitySuggestions(data.getCitySuggestions || []);
//         setDropdownVisible(true);
//       },
//       onError: (error) => {
//         console.error("City suggestion error", error);
//         setCitySuggestions([]);
//         setDropdownVisible(false);
//       },
//       fetchPolicy: "no-cache",
//     }
//   );

//   const [fetchWeather, { loading: weatherLoading }] = useLazyQuery(
//     GET_CITY_WEATHER,
//     {
//       onCompleted: (data) => {
//         if (data?.getCityWeather && pendingCityRef.current) {
//           const { lat, lon } = pendingCityRef.current;
//           const cityKey = `${lat},${lon}`;
//           setCityWeatherMap((prev) => ({
//             ...prev,
//             [cityKey]: data.getCityWeather,
//           }));
//           pendingCityRef.current = null;
//         }
//       },
//       onError: (error) => {
//         console.error("Weather fetch error", error);
//         pendingCityRef.current = null;
//       },
//       fetchPolicy: "no-cache",
//     }
//   );

//   const handleCitySearch = (query) => {
//     setCityQuery(query);
//     if (query.length < 2) {
//       setCitySuggestions([]);
//       setDropdownVisible(false);
//       return;
//     }
//     fetchCities({ variables: { name: query } });
//   };

//   const handleCitySelect = (city) => {
//     const cityKey = `${city.lat},${city.lon}`;
//     if (!selectedCities.some((c) => `${c.lat},${c.lon}` === cityKey)) {
//       setSelectedCities((prev) => [...prev, city]);
//       setLastSelectedCity(city);
//       pendingCityRef.current = city;
//       fetchWeather({ variables: { lat: city.lat, lon: city.lon } });
//     }
//     // setCityQuery(city.name);
//     setCityQuery("");

//     setCitySuggestions([]);
//     setDropdownVisible(false);
//     Keyboard.dismiss();
//   };

//   // const handleGetWeather = () => {
//   //   if (lastSelectedCity) {
//   //     const { lat, lon } = lastSelectedCity;
//   //     pendingCityRef.current = lastSelectedCity;
//   //     fetchWeather({ variables: { lat, lon } });
//   //     setCityQuery("");

//   //   }
//   // };
// const handleGetWeather = () => {
//   if (lastSelectedCity) {
//     handleCitySelect(lastSelectedCity);
//   }
// };

//   const handleRemoveCity = (city) => {
//     const key = `${city.lat},${city.lon}`;
//     setSelectedCities((prev) =>
//       prev.filter((c) => `${c.lat},${c.lon}` !== key)
//     );
//     setCityWeatherMap((prev) => {
//       const updated = { ...prev };
//       delete updated[key];
//       return updated;
//     });
//     if (
//       lastSelectedCity &&
//       `${lastSelectedCity.lat},${lastSelectedCity.lon}` === key
//     ) {
//       setLastSelectedCity(null);
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

//         {dropdownVisible && citySuggestions.length > 0 && (
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

//         {citiesLoading && <ActivityIndicator style={{ marginTop: 10 }} />}

        
//         <Button
//           mode="contained"
//           onPress={handleGetWeather}
//           style={styles.button}
//           disabled={!lastSelectedCity}
//         >
//           Add City
//         </Button>

//         {weatherLoading && <ActivityIndicator style={{ marginTop: 20 }} />}

//         <ScrollView
//           style={{ width: "100%" }}
//           contentContainerStyle={{ paddingBottom: 80 }}
//         >
//           {selectedCities.map((city) => {
//             const key = `${city.lat},${city.lon}`;
//             const weather = cityWeatherMap[key];
//             return (
//               <View key={key} style={styles.weatherBox}>
//                 <Text style={styles.resultTitle}>{city.name}</Text>
//                 {weather ? (
//                   <>
//                     <Text>
//                       Temperature: {Math.round(weather.temperature)}°C
//                     </Text>
//                     <Text>Feels Like: {Math.round(weather.feelsLike)}°C</Text>
//                     <Text>Condition: {weather.description}</Text>
//                     <Image
//                       source={{
//                         uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
//                       }}
//                       style={{ width: 100, height: 100, marginTop: 10 }}
//                     />
//                     <Text style={{ marginTop: 10, fontStyle: "italic" }}>
//                       {new Date().toLocaleString()}
//                     </Text>
//                   </>
//                 ) : (
//                   <ActivityIndicator style={{ marginTop: 10 }} />
//                 )}

//                 {/* 🗑 REMOVE CITY BUTTON */}
//                 <TouchableOpacity
//                   onPress={() => handleRemoveCity(city)}
//                   style={{
//                     marginTop: 10,
//                     padding: 6,
//                     backgroundColor: "#ffdddd",
//                     borderRadius: 5,
//                   }}
//                 >
//                   <Text style={{ color: "#a00" }}>Remove</Text>
//                 </TouchableOpacity>
//               </View>
//             );
//           })}
//         </ScrollView>
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
//     justifyContent: "flex-start",
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
// });

// export default function App() {
//   return (
//     <ApolloProvider client={client}>
//       <WeatherApp />
//     </ApolloProvider>
//   );
// }








import React, { useState, useRef } from "react";
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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "react-native-paper";
import { useLazyQuery } from "@apollo/client";
import client from "../apollo";
import { GET_CITY_SUGGESTIONS, GET_CITY_WEATHER } from "../queries";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableWithoutFeedback } from "react-native";
import { ApolloProvider } from "@apollo/client";

const BACKGROUND_IMAGE = {
  uri: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
};

const WeatherApp = () => {
  const [cityQuery, setCityQuery] = useState("");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [cityWeatherMap, setCityWeatherMap] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [lastSelectedCity, setLastSelectedCity] = useState(null);
  const pendingCityRef = useRef(null);

  const [fetchCities, { loading: citiesLoading }] = useLazyQuery(
    GET_CITY_SUGGESTIONS,
    {
      onCompleted: (data) => {
        const suggestions = data.getCitySuggestions || [];
        setCitySuggestions(suggestions);
        setDropdownVisible(true);

        // Automatically select first suggestion for Add City button
        if (suggestions.length > 0) {
          setLastSelectedCity(suggestions[0]);
        } else {
          setLastSelectedCity(null);
        }
      },
      onError: (error) => {
        console.error("City suggestion error", error);
        setCitySuggestions([]);
        setDropdownVisible(false);
        setLastSelectedCity(null);
      },
      fetchPolicy: "no-cache",
    }
  );

  const [fetchWeather, { loading: weatherLoading }] = useLazyQuery(
    GET_CITY_WEATHER,
    {
      onCompleted: (data) => {
        if (data?.getCityWeather && pendingCityRef.current) {
          const { lat, lon } = pendingCityRef.current;
          const cityKey = `${lat},${lon}`;
          setCityWeatherMap((prev) => ({
            ...prev,
            [cityKey]: data.getCityWeather,
          }));
          pendingCityRef.current = null;
        }
      },
      onError: (error) => {
        console.error("Weather fetch error", error);
        pendingCityRef.current = null;
      },
      fetchPolicy: "no-cache",
    }
  );

  const handleCitySearch = (query) => {
    setCityQuery(query);

    if (query.trim() === "") {
      setCitySuggestions([]);
      setDropdownVisible(false);
      setLastSelectedCity(null); // clear selected suggestion
      return;
    }

    if (query.length < 1) {
      setCitySuggestions([]);
      setDropdownVisible(false);
      setLastSelectedCity(null);
      return;
    }
    fetchCities({ variables: { name: query } });
  };

  const handleCitySelect = (city) => {
    const cityKey = `${city.lat},${city.lon}`;
    if (!selectedCities.some((c) => `${c.lat},${c.lon}` === cityKey)) {
      setSelectedCities((prev) => [...prev, city]);
      setLastSelectedCity(city);
      pendingCityRef.current = city;
      fetchWeather({ variables: { lat: city.lat, lon: city.lon } });
    }
    setCityQuery("");
    setCitySuggestions([]);
    setDropdownVisible(false);
    Keyboard.dismiss();
  };

  const handleGetWeather = () => {
    // Use lastSelectedCity or fallback to first suggestion
    const cityToAdd =
      lastSelectedCity ||
      (citySuggestions.length > 0 ? citySuggestions[0] : null);

    if (cityToAdd) {
      handleCitySelect(cityToAdd);
    }
  };

  const handleRemoveCity = (city) => {
    const key = `${city.lat},${city.lon}`;
    setSelectedCities((prev) =>
      prev.filter((c) => `${c.lat},${c.lon}` !== key)
    );
    setCityWeatherMap((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    if (
      lastSelectedCity &&
      `${lastSelectedCity.lat},${lastSelectedCity.lon}` === key
    ) {
      setLastSelectedCity(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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

            {dropdownVisible &&
              cityQuery.length >= 1 &&
              citySuggestions.length > 0 && (
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
                  keyboardShouldPersistTaps="handled"
                />
              )}

            {citiesLoading && <ActivityIndicator style={{ marginTop: 10 }} />}

            <Button
              mode="contained"
              onPress={handleGetWeather}
              style={styles.button}
              labelStyle={{ color: "#fff" }}
              disabled={!lastSelectedCity && citySuggestions.length === 0}
            >
              Add City
            </Button>

            {weatherLoading && <ActivityIndicator style={{ marginTop: 20 }} />}

            <ScrollView
              style={{ width: "100%" }}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{ paddingBottom: 80 }}
              scrollEnabled={true}
            >
              {selectedCities.map((city) => {
                const key = `${city.lat},${city.lon}`;
                const weather = cityWeatherMap[key];
                return (
                  <View
                    key={key}
                    style={styles.weatherBox}
                    pointerEvents="box-none"
                  >
                    <Text style={styles.resultTitle}>{city.name}</Text>
                    {weather ? (
                      <>
                        <Text>
                          Temperature: {Math.round(weather.temperature)}°C
                        </Text>
                        <Text>
                          Feels Like: {Math.round(weather.feelsLike)}°C
                        </Text>
                        <Text>Condition: {weather.description}</Text>
                        <Image
                          source={{
                            uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
                          }}
                          style={{ width: 100, height: 100, marginTop: 10 }}
                        />
                        <Text style={{ marginTop: 10, fontStyle: "italic" }}>
                          {new Date().toLocaleString()}
                        </Text>
                      </>
                    ) : (
                      <ActivityIndicator style={{ marginTop: 10 }} />
                    )}

                    {/* 🗑 REMOVE CITY BUTTON */}
                    <TouchableOpacity
                      onPress={() => handleRemoveCity(city)}
                      style={{
                        marginTop: 10,
                        marginBottom: 10,
                        padding: 6,
                        backgroundColor: "#ffdddd",
                        borderRadius: 6,
                        position: "absolute",
                        bottom: 5,
                        right: 10,
                      }}
                    >
                      <Icon name="delete" size={24} color="#a00" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    justifyContent: "flex-start",
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
    height: "7%",
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
    width: "60%",
    backgroundColor: "#800080",
  },
  weatherBox: {
    marginTop: 15,
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
