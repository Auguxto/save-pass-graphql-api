import CreateAddress from "../Services/Address/CreateAddress";

export default {
  Query: {},
  Mutation: {
    async createAddress(_: any, address: Address, context: MutationContext) {
      return CreateAddress.execute(address, context);
    },
  },
};
