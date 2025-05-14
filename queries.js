//  queries.js

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
    weather: Weather
  }

  type Query {
    getCityByName(name: String!): City
  }
`;

const resolvers = {
  Query: {
    getCityByName: async (_, { name }) => {
      const apiKey = process.env.OPENWEATHERMAP_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${apiKey}`
      );
      const data = response.data;
      return {
        name: data.name,
        weather: {
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        },
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
