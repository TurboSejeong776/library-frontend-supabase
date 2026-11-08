import dayjs from 'dayjs';
import type { Overdue } from '@/types/borrow-types';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

import FakeCover from '@/assets/FakeCover.png';

type BorrowCardProp = {
  book: Overdue;
};

const BorrowCardAlt: React.FC<BorrowCardProp> = ({ book }) => {
  const days = dayjs(book.dueAt).diff(dayjs(book.borrowedAt), 'day');

  return (
    <section
      id='base'
      className='flex flex-col w-[361px] rounded-[16px] p-[16px] gap-[16px] bg-white text-black sm:w-full sm:p-[20px] sm:gap-[20px]'
    >
      <div className='flex flex-row w-full justify-between text-sm'>
        <div className='flex flex-row gap-[4px]'>
          <p className='font-bold text-sm sm:text-base tracking-tight'>
            Status
          </p>
          <Badge
            className={`${
              book.status == 'BORROWED'
                ? 'bg-[#24A5000D] text-[#24A500]'
                : book.status === 'RETURNED'
                  ? 'bg-[#1C65DA0D] text-[#1C65DA]'
                  : 'bg-[#EE1D521A] text-[#EE1D52]'
            }`}
          >
            {book.status}
          </Badge>
        </div>
        <div className='flex flex-row gap-[4px]'>
          <p className='font-bold text-sm sm:text-base tracking-tight'>
            Due Date
          </p>
          <Badge className='bg-[#EE1D521A] text-[#EE1D52]'>
            {dayjs(book.dueAt).format('DD MMM YYYY')}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className='flex flex-col sm:flex-row w-full gap-[12px] sm:gap-none sm:justify-between'>
        <img src={FakeCover} alt='cover plz' className='w-[92px] h-[138px]' />
        <div className='flex flex-col w-[196px] gap-[4px]'>
          {/* Backend doesn't provide book category in the GET loan section */}
          <Badge variant='outline'>
            <p className='font-bold text-sm tracking-tight'>Category</p>
          </Badge>
          <p className='font-bold text-base sm:text-xl tracking-tight'>
            {book.book.title}
          </p>
          {/* Backend doesn't provide book author in the GET loan section */}
          <p className='font-medium text-sm sm:text-base tracking-tight'>
            Author Name
          </p>
          <p className='font-bold text-sm sm:text-base tracking-tight'>
            {dayjs(book.borrowedAt).format('DD MMM YYYY')} • Duration {days}{' '}
            Days
          </p>
        </div>

        <div className='flex flex-col min-w-0 ml-auto'>
          <p className='font-semibold text-sm sm:text-base tracking-tight'>
            Borrower's name
          </p>
          <p className='font-bold text-base sm:text-lg tracking-tight'>
            {book.user.name}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BorrowCardAlt;
