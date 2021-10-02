import { ApolloServer } from "apollo-server";
import express from "express";
import { config } from "dotenv";
config();

import typeDefs from "./Schemas";
import resolvers from "./Resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    authHeader: req.headers.authorization,
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
