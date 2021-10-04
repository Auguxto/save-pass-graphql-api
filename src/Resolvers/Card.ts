import CreateCard from "../Services/Card/CreateCard";
import GetCard from "../Services/Card/GetCard";

export default {
  Query: {
    async card(_: any, { id }: { id: string }, context: MutationContext) {
      return GetCard.execute(id, context);
    },
  },
  Mutation: {
    async createCard(_: any, card: Card, context: MutationContext) {
      return CreateCard.execute(card, context);
    },
  },
};
