//queries.js

import { gql } from "@apollo/client";

export const GET_CITY_SUGGESTIONS = gql`
  query GetCitySuggestions($name: String!) {
    getCitySuggestions(name: $name) {
      name
      lat
      lon
    }
  }
`;

export const GET_CITY_WEATHER = gql`
  query GetCityWeather($lat: Float!, $lon: Float!) {
    getCityWeather(lat: $lat, lon: $lon) {
      temperature
      feelsLike
      description
      icon
    }
  }
`;



