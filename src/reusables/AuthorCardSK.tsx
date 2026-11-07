import Man from '@/assets/Man.png';

import { BookMarked } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const AuthorCard = () => {
  return (
    <section className='flex flex-row w-full h-[84px] rounded-[12px] p-[12px] gap-[12px] bg-white text-black sm:w-[292px] sm:p-[16px] sm:gap-[16px]'>
      {/* Backend doesn't provide pfp image to be used */}
      <img
        src={Man}
        alt='Man'
        className='w-[60px] h-[60px] sm:w-[81px] sm:h-[81px]'
      />
      <div className='flex flex-col w-[108px] gap-[2px]'>
        <p className='font-bold text-base sm:text-lg tracking-tight'>
          <Skeleton className='w-full h-8 bg-gray-400' />
        </p>
        <div className='flex flex-row gap-[6px]'>
          <BookMarked className='w-[24px] h-[24px] text-[#1C65DA] fill-[#1C65DA]' />
          <p className='font-medium text-sm sm:text-base tracking-tight'>
            {Math.floor(Math.random() * 20) + 1} Books
          </p>
        </div>
      </div>
    </section>
  );
};

export default AuthorCard;
