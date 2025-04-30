// // apollo.js
// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const client = new ApolloClient({
//   uri: "https://graphql-weather-api.vercel.app/", // Public GraphQL weather API
//   cache: new InMemoryCache(),
// });

// export default client;



const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
