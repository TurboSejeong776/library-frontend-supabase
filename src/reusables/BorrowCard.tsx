import dayjs from 'dayjs';

import type { MyBorrow } from '@/types/borrow-types';
import type { ReviewPost } from '@/types/book-types';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import ReviewForm from '@/my-components/ReviewForm';

type BorrowCardProp = {
  book: MyBorrow;
};

const BorrowCard: React.FC<BorrowCardProp> = ({ book }) => {
  const days = dayjs(book.dueAt).diff(dayjs(book.borrowedAt), 'day');

  const reviewData: ReviewPost = {
    bookId: book.book.id,
    star: 0,
    comment: '',
  };

  return (
    <section
      id='base'
      className='flex flex-col w-[361px] rounded-[16px] p-[16px] gap-[16px] bg-white text-black sm:w-full sm:p-[20px] sm:gap-[20px] justify-center items-center'
    >
      <div className='flex flex-row w-full justify-between items-center text-sm'>
        <div className='flex flex-row gap-[4px] justify-center'>
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
            } items-center justify-center`}
          >
            {book.status}
          </Badge>
        </div>
        <div className='flex flex-row gap-[4px]'>
          <p className='font-bold text-sm sm:text-base tracking-tight'>
            Due Date
          </p>
          <Badge className='bg-[#EE1D521A] text-[#EE1D52] items-center justify-center'>
            {' '}
            {dayjs(book.dueAt).format('DD MMM YYYY')}
          </Badge>
        </div>
      </div>

      <Separator />

      <div className='flex flex-col sm:flex-row w-full gap-[24px] sm:gap-none sm:justify-between items-center'>
        <div className='flex flex-row w-full gap-[16px]'>
          <img
            src={book.book.coverImage}
            alt='cover plz'
            className='w-[92px] h-[138px]'
          />
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
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className='!bg-[#1C65DA] !hover:bg-[#3a85ff] w-full h-[40px] sm:w-[182px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'>
              Give Review
            </Button>
          </DialogTrigger>

          <ReviewForm rev={reviewData} onClose={() => {}} />
        </Dialog>
      </div>
    </section>
  );
};

export default BorrowCard;
