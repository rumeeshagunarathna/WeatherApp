// server.js
const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");
require("dotenv").config();

const typeDefs = gql`
  type Weather {
    temperature: Float
    feelsLike: Float
    description: String
    icon: String
  }

  type City {
    name: String
    lat: Float
    lon: Float
  }

  type Query {
    getCitySuggestions(name: String!): [City]
    getCityWeather(lat: Float!, lon: Float!): Weather
  }
`;

const resolvers = {
  Query: {
    getCitySuggestions: async (_, { name }) => {
      const apiKey = process.env.OPENWEATHERMAP_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${apiKey}`
      );
      return response.data.map((city) => ({
        name:
          city.name +
          (city.state ? `, ${city.state}` : "") +
          `, ${city.country}`,
        lat: city.lat,
        lon: city.lon,
      }));
    },

    getCityWeather: async (_, { lat, lon }) => {
      const apiKey = process.env.OPENWEATHERMAP_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      );
      const data = response.data;
      return {
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});



