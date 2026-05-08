import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getMyReviews } from '@/api/service/user';
import type { Review } from '@/types/user-types';

import Searchbar from './Searchbar';
import RevDetCard from '@/reusables/RevDetCard';

const ReviewList = () => {
  const [keyword, setKeyword] = useState('');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['my-reviews'],
      queryFn: ({ pageParam = 1 }) => getMyReviews(pageParam, 10),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.data.pagination;
        return page < totalPages ? page + 1 : undefined;
      },
    });

  const reviews: Review[] =
    data?.pages.flatMap((page) => page.data.reviews) ?? [];

  const filtered = reviews.filter((r) =>
    keyword ? r.book.title.toLowerCase().includes(keyword.toLowerCase()) : true
  );
  return (
    <section
      id='base'
      className='flex flex-col w-full gap-[16px] sm:gap-[24px]'
    >
      <p className='font-bold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-extrabold text-black'>
        Review
      </p>
      <Searchbar keyword={keyword} setKeyword={setKeyword} />

      {/* Render RevDetCards */}
      {filtered.map((rev) => (
        <RevDetCard key={rev.id} rev={rev} />
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className='self-center rounded-md bg-black px-4 py-2 text-white'
        >
          {isFetchingNextPage ? 'Loading more…' : 'Load more'}
        </button>
      )}
    </section>
  );
};

export default ReviewList;
