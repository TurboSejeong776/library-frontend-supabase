export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

// For get book by {ID}
export type BookId = ApiResponse<Book>;

export type Book = {
  id: number;
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string | undefined;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  //category by id:
  //1 = Fiction
  //2 = Sci-fi
  //3 = Business or Finance I guess
  //4 = Self-help
  //5 = Technology...wha?
  createdAt: string;
  updatedAt: string;
  author: BookAuthor;
  category: BookCategory;
  reviews: BookReview[];
};

export type BookAuthor = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type BookCategory = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type BookReview = {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  user: ReviewUser;
};

export type ReviewUser = {
  id: number;
  name: string;
};

export type BooksFilter = ApiResponse<{
  books: Book[];
  pagination: Pagination;
}>;

export type BookRecco = ApiResponse<{
  mode: string;
  books: RecommendedBooks[];
}>;

export type RecommendedBooks = Omit<Book, 'reviews' | 'author' | 'category'> & {
  author: Pick<BookAuthor, 'id' | 'name'>;
  category: Pick<BookCategory, 'id' | 'name'>;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CategoriesAPI = ApiResponse<{
  categories: BookCategory[];
}>;

export type CartBook = Pick<Book, 'id' | 'title' | 'coverImage'> & {
  category: Pick<BookCategory, 'id' | 'name'>;
  author: Pick<BookAuthor, 'id' | 'name'>;
};

export type ReviewsResponse = ApiResponse<{
  bookId: number;
  reviews: BookReview[];
  pagination: Pagination;
}>;

export type ReviewPost = {
  bookId: number;
  star: number;
  comment: string;
};

export type ReviewPostResponse = ApiResponse<{
  review: Pick<
    BookReview,
    'id' | 'star' | 'comment' | 'bookId' | 'userId' | 'createdAt'
  >;
  bookStats: Pick<Book, 'rating' | 'reviewCount'>;
}>;

export type PostBook = {
  title: string;
  description: string;
  isbn: string;
  publishedYear: number;
  coverImage: string;
  authorId: number;
  categoryId: number;
  totalCopies: number;
  availableCopies: number;
};
