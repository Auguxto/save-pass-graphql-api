import { ApolloError } from "apollo-server-errors";

class AppError extends ApolloError {
  constructor(message: string) {
    super(message, "SAVEPASS_ERROR");

    Object.defineProperty(this, "name", { value: "AppError" });
  }
}

export default AppError;
