import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getOverdue } from '@/api/service/borrow';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

import BorrowCardAlt from '@/reusables/admin/BorrowCardAlt';
import Searchbar from '../Searchbar';

const AdminBorrowList = () => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<
    'ALL' | 'AVAILABLE' | 'BORROWED' | 'RETURNED'
  >('ALL');
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['overdue', { keyword }],
    queryFn: ({ pageParam = 1 }) => getOverdue(pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.data.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
  const overdueList = data?.pages.flatMap((page) => page.data.overdue) ?? [];
  const filtered = overdueList.filter((o) => {
    const matchKeyword = keyword
      ? o.book.title.toLowerCase().includes(keyword.toLowerCase())
      : true;
    const matchStatus = status === 'ALL' ? true : o.status === status;
    return matchKeyword && matchStatus;
  });
  return (
    <section className='flex flex-col w-full gap-[16px] sm:gap-[24px] bg-white text-black '>
      <p className='font-bold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-extrabold text-black'>
        Borrowed List
      </p>
      <Searchbar keyword={keyword} setKeyword={setKeyword} />
      <ScrollArea className='flex flex-row w-full sm:w-[510px] gap-[8px] whitespace-nowrap'>
        {['ALL', 'AVAILABLE', 'BORROWED', 'RETURNED'].map((s) => (
          <Badge
            key={s}
            variant={status === s ? 'default' : 'outline'}
            onClick={() => setStatus(s as typeof status)}
            className='cursor-pointer'
          >
            {s}
          </Badge>
        ))}
      </ScrollArea>

      {/* Render all borrowed card below */}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong.</p>}

      {filtered.map((borrow) => (
        <BorrowCardAlt key={borrow.id} book={borrow} />
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

export default AdminBorrowList;
