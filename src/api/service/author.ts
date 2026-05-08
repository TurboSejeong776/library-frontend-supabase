import api from '../api';
import type {
  AuthorsResponse,
  AuthorBooksResponse,
} from '@/types/author-types';

export const getAllAuthors = async (): Promise<AuthorsResponse> => {
  const { data } = await api.get<AuthorsResponse>(
    '/functions/v1/authors-get-all'
  );
  return data;
};

export const getAuthorBooks = async (
  authorId: number
): Promise<AuthorBooksResponse> => {
  const { data } = await api.get<AuthorBooksResponse>(
    `functions/v1/authors-get-books/${authorId}`
  );
  return data;
};
