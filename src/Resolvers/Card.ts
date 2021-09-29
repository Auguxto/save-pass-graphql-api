import CreateCard from "../Services/User/CreateCard";

export default {
  Query: {},
  Mutation: {
    async createCard(_: any, card: Card, context: MutationContext) {
      return CreateCard.execute(card, context);
    },
  },
};
