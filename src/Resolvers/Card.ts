import CreateCard from "../Services/Card/CreateCard";
import GetCard from "../Services/Card/GetCard";

import { Card, MutationContext } from "../types/savepass";

export default {
  Query: {
    async card(_: any, { id }: { id: string }, context: MutationContext) {
      return GetCard.findOne(id, context);
    },
    async cards(_: any, args, context: MutationContext) {
      return GetCard.findMany(context);
    },
  },
  Mutation: {
    async createCard(_: any, card: Card, context: MutationContext) {
      return CreateCard.execute(card, context);
    },
  },
};
