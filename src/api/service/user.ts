import api from '../api';
import type { ProfileResponse, MyReviewsResponse } from '@/types/user-types';

export const getProfile = async (): Promise<ProfileResponse> => {
  const { data } = await api.get<ProfileResponse>('/me');
  return data;
};

export const getMyReviews = async (page = 1, limit = 10) => {
  const { data } = await api.get<MyReviewsResponse>(
    `/me/reviews?page=${page}&limit=${limit}`
  );
  return data;
};
