export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Profile = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export type LoanStats = {
  borrowed: number;
  late: number;
  returned: number;
  total: number;
};

export type ProfileData = {
  profile: Profile;
  loanStats: LoanStats;
  reviewsCount: number;
};

export type Review = {
  id: number;
  star: number;
  comment: string;
  userId: number;
  bookId: number;
  createdAt: string;
  book: {
    id: number;
    title: string;
    coverImage: string;
  };
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type MyReviewsData = {
  reviews: Review[];
  pagination: Pagination;
};

export type ProfileResponse = ApiResponse<ProfileData>;
export type MyReviewsResponse = ApiResponse<MyReviewsData>;
