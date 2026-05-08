import api from '../api';
import type {
  BorrowResponse,
  MyBorrowResponse,
  OverdueResponse,
} from '@/types/borrow-types';

export const borrowBook = async (
  bookId: number,
  days: number
): Promise<BorrowResponse> => {
  const { data } = await api.post<BorrowResponse>(
    '/functions/v1/loans-api/loans',
    { bookId, days }
  );
  return data;
};

export const returnBook = async (id: number): Promise<BorrowResponse> => {
  const { data } = await api.patch<BorrowResponse>(
    `/functions/v1/loans-api/loans/${id}/return`
  );
  return data;
};

export const getBorrow = async (): Promise<MyBorrowResponse> => {
  const { data } = await api.get<MyBorrowResponse>(
    '/functions/v1/loans-api/loans/my'
  );
  return data;
};

export const getOverdue = async (
  page: number = 1,
  limit: number = 20
): Promise<OverdueResponse> => {
  const { data } = await api.get<OverdueResponse>(
    `/functions/v1/loans-api/admin/loans/overdue?page=${page}&limit=${limit}`
  );
  return data;
};
