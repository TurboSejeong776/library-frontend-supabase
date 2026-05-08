import dayjs from 'dayjs';

import type { Review } from '@/types/user-types';

import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

import { Star } from 'lucide-react';

type RevDetProps = {
  rev: Review;
};

const RevDetCard: React.FC<RevDetProps> = ({ rev }) => {
  return (
    <section className='flex flex-col w-[361px] min-h-[346px] rounded-[16px] gap-[16px] p-[16px] bg-white text-black sm:w-full sm:p-[20px] sm:gap-[20px]'>
      <p className='font-semibold text-sm sm:text-base tracking-tight'>
        {dayjs(rev.createdAt).format('DD MMMM YYYY, HH:mm')}
      </p>

      <Separator />

      <div className='flex flex-row w-[278px] gap-[12px] sm:w-full sm:gap-[16px]'>
        <img
          src={rev.book.coverImage}
          alt='cover plz'
          className='w-[70px] h-[106px] sm:w-[92px] sm:h-[138px]'
        />
        <div className='flex flex-col w-[196px] gap-[4px]'>
          {/* The API doesn't provide Category. */}
          <Badge variant='outline'>
            <p className='font-bold text-sm tracking-tight'>Category</p>
          </Badge>
          <p className='font-bold text-base sm:text-xl tracking-tight'>
            {rev.book.title}
          </p>
          {/* The API doesn't provide Author. */}
          <p className='font-bold text-base sm:text-xl tracking-tight text-[#414651]'>
            Author
          </p>
        </div>
      </div>

      <Separator />

      <div className='flex flex-col w-full h-[116px] sm:h-[92px] gap-[8px]'>
        <div className='flex flex-row'>
          {Array.from({ length: rev.star }).map((_, i) => (
            <Star
              key={i}
              className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]'
            />
          ))}
        </div>

        <p className='text-sm sm:text-base tracking-tight text-black'>
          {rev.comment}
        </p>
      </div>
    </section>
  );
};

export default RevDetCard;
