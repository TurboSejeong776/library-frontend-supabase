import { Skeleton } from '@/components/ui/skeleton';

import Man from '../../assets/Man.png';

const ReviewCardSK = () => {
  return (
    <section className='flex flex-col w-[361px] h-[222px] sm:h-[204px] p-[16px] rounded-[16px] gap-[16px] bg-white'>
      <div className='flex flex-row w-[212px] h-[58px] gap-[12px] text-black sm:w-[238px] sm:h-[64px]'>
        <img
          src={Man}
          alt='Man'
          className='w-[58px] h-[58px] sm:w-[64px] sm:h-[64px]'
        />
        <div className='flex flex-col w-[142px] sm:w-[162px] h-[58px] sm:h-[62px] justify-center sm:tracking-tight gap-[4px]'>
          <Skeleton className='w-full h-8 bg-gray-400' />
          <Skeleton className='w-full h-8 bg-gray-400' />
        </div>
      </div>

      <div className='flex flex-col w-full h-[116px] sm:h-[92px] gap-[8px]'>
        <div className='flex flex-row'>
          <Skeleton className='w-full h-8 bg-gray-400' />
        </div>

        <p className='text-sm sm:text-base tracking-tight text-black'>
          <Skeleton className='w-full h-8 bg-gray-400' />
        </p>
      </div>
    </section>
  );
};

export default ReviewCardSK;
