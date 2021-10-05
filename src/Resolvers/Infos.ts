import CreateInfo from "../Services/Info/CreateInfo";
import GetInfo from "../Services/Info/GetInfo";

export default {
  Query: {
    async Info(_: any, args, context: MutationContext) {
      return GetInfo.findInfo(context);
    },
  },
  Mutation: {
    async createAddress(_: any, info: Infos, context: MutationContext) {
      return CreateInfo.execute(info, context);
    },
  },
};
