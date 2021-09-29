import { ApolloServer } from "apollo-server";
import { config } from "dotenv";
config();

import typeDefs from "./Schemas";
import resolvers from "./Resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
