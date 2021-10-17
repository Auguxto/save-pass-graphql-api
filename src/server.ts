import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config();

import typeDefs from "./Schemas";
import resolvers from "./Resolvers";

import webhook from "./stripe/webhook";

async function startServer() {
  const app = express();

  app.use(cors({ origin: "http://localhost:3001", credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use(webhook);

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({
      authHeader: req.headers.authorization,
      req,
      res,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app, cors: false });
  await new Promise(() =>
    httpServer.listen({ port: 4000 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    })
  );
}

startServer();
