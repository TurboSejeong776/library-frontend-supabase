import type { ApiResponse, Pagination } from './book-types';

export type BorrowStatus = 'BORROWED' | 'RETURNED' | 'OVERDUE';

export type Borrow = {
  id: number;
  userId: number;
  bookId: number;
  status: BorrowStatus;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
};

export type BorrowResponse = ApiResponse<{ borrow: Borrow }>;

export type MyBorrow = Borrow & {
  book: {
    id: number;
    title: string;
    coverImage: string;
  };
};

export type MyBorrowResponse = ApiResponse<{ loans: MyBorrow[] }>;

export type Overdue = Borrow & {
  user: {
    id: number;
    name: string;
    email: string;
  };
  book: {
    id: number;
    title: string;
    author: {
      id: number;
      name: string;
    };
  };
};

export type OverdueResponse = ApiResponse<{
  overdue: Overdue[];
  pagination: Pagination;
}>;
