import GetLogged from "../Services/Logged/GetLogged";
import { MutationContext } from "../types/savepass";

export default {
  Query: {
    async logged(_: any, args, context: MutationContext) {
      return GetLogged.execute(context);
    },
  },
};
