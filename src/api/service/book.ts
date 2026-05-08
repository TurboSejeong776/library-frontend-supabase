import api from '../api';
import type {
  BookId,
  BookRecco,
  BooksFilter,
  BookCategory,
  CategoriesAPI,
  ReviewsResponse,
  ReviewPost,
  ReviewPostResponse,
  PostBook,
  ApiResponse,
} from '@/types/book-types';

export const getBookById = async (id: number): Promise<BookId> => {
  const { data } = await api.get<BookId>(`/functions/v1/book-api/books/${id}`);
  return data;
};

export const getRecommendedBooks = async (
  limit: number = 10
): Promise<BookRecco> => {
  const { data } = await api.get<BookRecco>(
    `/functions/v1/book-api/books/recommend?limit=${limit}`
  );
  return data;
};

export type GetBooksParams = {
  q?: string;
  categoryId?: number;
  authorId?: number;
  page?: number;
  limit?: number;
};

export const getBooks = async (
  params: GetBooksParams
): Promise<BooksFilter> => {
  const { data } = await api.get<BooksFilter>('/functions/v1/book-api/books', {
    params,
  });
  return data;
};

export const getCategories = async (): Promise<BookCategory[]> => {
  const { data } = await api.get<CategoriesAPI>(
    '/functions/v1/book-api/categories'
  );
  return data.data.categories;
};

export const getBookReviews = async (
  bookId: number,
  page: number = 1,
  limit: number = 10
): Promise<ReviewsResponse> => {
  const { data } = await api.get<ReviewsResponse>(
    `/functions/v1/book-api/reviews/book/${bookId}?page=${page}&limit=${limit}`
  );
  return data;
};

export const postReview = async (payload: ReviewPost) => {
  const { data } = await api.post<ReviewPostResponse>(
    '/functions/v1/book-api/reviews',
    payload
  );
  return data;
};

export const postBook = async (
  payload: PostBook
): Promise<ApiResponse<PostBook>> => {
  const { data } = await api.post<ApiResponse<PostBook>>(
    '/functions/v1/book-api/books',
    payload
  );
  return data;
};

export const updateBook = async (id: number, payload: PostBook) => {
  const { data } = await api.put<ApiResponse<PostBook>>(
    `/functions/v1/book-api/books/${id}`,
    payload
  );
  return data;
};
