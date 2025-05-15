// //  apollo.js

// const client = new ApolloClient({
//   uri: "http://localhost:4000/",
//   cache: new InMemoryCache(),
// });

//////////////////////////////////////////////////////////

// apollo.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://172.20.10.4:4000", // use the local IP if testing on a device
  cache: new InMemoryCache(),
});

export default client;

