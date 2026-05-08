import type { Book } from './book-types';

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Author = {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthorsResponse = ApiResponse<{
  authors: Author[];
}>;

export type AuthorBooksResponse = ApiResponse<{
  author: Author;
  books: Book[];
}>;
