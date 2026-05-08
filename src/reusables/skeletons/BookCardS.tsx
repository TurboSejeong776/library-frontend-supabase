import { StarIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

const BookCardS = () => {
  return (
    <section className='flex flex-col w-[172px] rounded-[16px] bg-white text-black item-center justify-center overflow-hidden'>
      <div className='w-[200px] h-[300px] bg-gray-400 animate-pulse' />
      <div className='flex flex-col w-full gap-[2px] p-[12px] sm:gap-[4px] sm:p-[16px]'>
        <Skeleton className='w-full h-4 bg-gray-400' />
        <Skeleton className='w-full h-4 bg-gray-400' />

        <div className='flex flex-row w-full gap-[2px] items-center'>
          <StarIcon className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
          <Skeleton className='w-full h-4 bg-gray-400' />
        </div>
      </div>
    </section>
  );
};

export default BookCardS;
