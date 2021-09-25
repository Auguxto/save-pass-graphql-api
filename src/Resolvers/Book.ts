type Book = {
  id: string;
  title: string;
};

const books: Book[] = [];

export default {
  Query: {
    books: () => books,
  },
  Mutation: {
    createBook(_: any, { id, title }: Book) {
      books.push({ id, title });
      return books;
    },
  },
};
