import Book from "./Book";
import User from "./User";

export default {
  Query: {
    books: Book.Query.books,
  },
  Mutation: {
    createBook: Book.Mutation.createBook,
    createUser: User.Mutation.createUser,
  },
};
