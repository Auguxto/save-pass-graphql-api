import CreateCard from "../Services/Card/CreateCard";

export default {
  Query: {},
  Mutation: {
    async createCard(_: any, card: Card, context: MutationContext) {
      return CreateCard.execute(card, context);
    },
  },
};
