import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import path from "path";

const schemas = loadFilesSync(path.join(__dirname, "./"), {
  extensions: ["graphql"],
});

const typeDefs = mergeTypeDefs(schemas);

export default typeDefs;
