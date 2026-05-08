import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getBorrow } from '@/api/service/borrow';
import type { MyBorrow, BorrowStatus } from '@/types/borrow-types';

import { Badge } from '@/components/ui/badge';

import BorrowCard from '@/reusables/BorrowCard';
import Searchbar from './Searchbar';

const BorrowList = () => {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState<BorrowStatus | ''>('');
  const { data } = useQuery({
    queryKey: ['borrowList'],
    queryFn: getBorrow,
  });

  const filtered = (data?.data.loans ?? [])
    .filter((b: MyBorrow) => (!filter ? true : b.status === filter))
    .filter((b: MyBorrow) =>
      keyword
        ? b.book.title.toLowerCase().includes(keyword.toLowerCase())
        : true
    );

  return (
    <section
      id='base'
      className='flex flex-col w-full gap-[16px] sm:gap-[24px]'
    >
      <p className='font-bold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-extrabold text-black'>
        Borrowed List
      </p>

      <Searchbar keyword={keyword} setKeyword={setKeyword} />

      <div className='flex flex-row w-full gap-[8px] sm:w-[361px] sm:gap-[12px]'>
        {(['', 'BORROWED', 'RETURNED', 'OVERDUE'] as (BorrowStatus | '')[]).map(
          (status) => (
            <Badge
              key={status || 'ALL'}
              variant='outline'
              className={filter === status ? 'bg-gray-200' : ''}
              onClick={() => setFilter(status)}
            >
              {status === ''
                ? 'All'
                : status.charAt(0) + status.slice(1).toLowerCase()}
            </Badge>
          )
        )}
      </div>

      {/* Render BorrowCard */}
      {filtered.map((book: MyBorrow) => (
        <BorrowCard key={book.id} book={book} />
      ))}
    </section>
  );
};
export default BorrowList;
