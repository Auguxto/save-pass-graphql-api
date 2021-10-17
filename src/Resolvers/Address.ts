import CreateAddress from "../Services/Address/CreateAddress";
import GetAddress from "../Services/Address/GetAddress";

import { Address, MutationContext } from "../types/savepass";

export default {
  Query: {
    async address(_: any, args, context: MutationContext) {
      return GetAddress.findAddress(context);
    },
  },
  Mutation: {
    async createAddress(_: any, address: Address, context: MutationContext) {
      return CreateAddress.execute(address, context);
    },
  },
};
