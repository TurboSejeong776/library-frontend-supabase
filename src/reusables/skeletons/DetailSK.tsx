import { Skeleton } from '@/components/ui/skeleton';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import { StarIcon, Share2Icon } from 'lucide-react';

import BookCardS from '@/reusables/skeletons/BookCardS';
import ReviewCardSK from '@/reusables/skeletons/ReviewCardSK';

const DetailSK = () => {
  return (
    <section
      id='baseDetail'
      className='flex flex-col w-[364px] sm:w-[1200px] m-auto gap-[16px] sm:gap-none bg-white justify-center items-center mt-[80px]'
    >
      <div
        id='mainBody'
        className='flex flex-col w-full gap-[24px] sm:w-[1200px] sm:m-auto sm:gap-[64px] justify-center '
      >
        {/* Breadcrumb section */}
        <Breadcrumb className='sm:mt-[24px] sm:mb-[-24px]'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/Home'>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Category</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Loading...</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div
          id='bookDetail'
          className='flex flex-col sm:flex-row w-full gap-[36px] items-center'
        >
          <Skeleton className='w-[222.75px] h-[328.83px] border-[2px] border-[#E9EAEB] sm:w-[337px] sm:h-[498px]' />

          <div
            id='bookData'
            className='flex flex-col w-full gap-[16px] sm:gap-[20px]'
          >
            <div
              id='bookDataTop'
              className='flex flex-col w-full gap-[12px] sm:gap-[22px]'
            >
              <div
                id='bookDataTopTop'
                className='flex flex-col w-full gap-[2px] sm:gap-[4px]'
              >
                <Badge variant='outline'>
                  <Skeleton className='w-full h-2 bg-gray-400' />
                </Badge>
                <p className='font-extrabold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-black text-black'>
                  <Skeleton className='w-full h-8 bg-gray-400' />
                </p>
                <p className='font-semibold text-sm sm:text-base tracking-tight text-[#414651]'>
                  <Skeleton className='w-full h-8 bg-gray-400' />
                </p>
                <div
                  id='bookRatingDisplay'
                  className='flex flex-row w-[192px] gap-[2px]'
                >
                  <StarIcon className='w-[24px] h-[24px] fill-[#FFAB0D]' />
                  <p className='font-bold text-base tracking-tight text-black'>
                    <Skeleton className='w-full h-8 bg-gray-400' />
                  </p>
                </div>
              </div>

              <div
                id='bookDataTopBottom'
                className='flex flex-row w-full gap-[20px] text-black tracking-tight'
              >
                <div
                  id='bookPages'
                  className='flex flex-col w-full sm:w-[102px] sm:h-[66px]'
                >
                  <p className='font-bold text-lg sm:text-[24px] sm:tracking-normal'>
                    <Skeleton className='w-full h-8 bg-gray-400' />
                  </p>
                  <p className='font-medium text-sm sm:text-base'>Page</p>
                </div>
                <Separator orientation='vertical' />
                <div
                  id='bookRateCount'
                  className='flex flex-col w-full sm:w-[102px] sm:h-[66px]'
                >
                  <p className='font-bold text-lg sm:text-[24px] sm:tracking-normal'>
                    <Skeleton className='w-full h-8 bg-gray-400' />
                  </p>
                  <p className='font-medium text-sm sm:text-base'>Rating</p>
                </div>
                <Separator orientation='vertical' />
                <div
                  id='bookRevCount'
                  className='flex flex-col w-full sm:w-[102px] sm:h-[66px]'
                >
                  <p className='font-bold text-lg sm:text-[24px] sm:tracking-normal'>
                    <Skeleton className='w-full h-8 bg-gray-400' />
                  </p>
                  <p className='font-medium text-sm sm:text-base'>Review</p>
                </div>
              </div>
            </div>

            <Separator className='sm:w-[559px]' />

            <div
              id='bookDesc'
              className='flex flex-col w-full sm:min-h-[128px] gap-[4px] text-black'
            >
              <p className='font-bold text-xl tracking-tight'>Description</p>
              <div className='flex-col flex gap-[4px]'>
                <Skeleton className='w-full h-8 bg-gray-400' />
                <Skeleton className='w-full h-8 bg-gray-400' />
                <Skeleton className='w-full h-8 bg-gray-400' />
              </div>
            </div>

            <div
              id='mobileShare'
              className='sm:hidden fixed bottom-0 flex flex-row gap-[12px] p-[16px] bg-white'
            >
              <Button variant='outline' className='p-[8px]'>
                Add to Cart
              </Button>
              <Button
                variant='outline'
                className='p-[8px] !bg-[#1C65DA] hover:!bg-[#3a85ff] !text-white'
              >
                Borrow
              </Button>
              <Button variant='outline' className='p-[12px]'>
                <Share2Icon className='w-[20px] h-[20px]' />
              </Button>
            </div>

            <div
              id='desktopShare'
              className='hidden sm:flex flex-row gap-[12px]'
            >
              <Button variant='outline' className='px-[120px]'>
                Add to Cart
              </Button>
              <Button
                variant='outline'
                className='px-[120px] !bg-[#1C65DA] hover:!bg-[#3a85ff] text-white'
              >
                Borrow
              </Button>
              <Button variant='outline' className='px-[120px]'>
                <Share2Icon className='w-[20px] h-[20px]' />
              </Button>
            </div>
          </div>
        </div>

        <Separator />

        <div
          id='reviewField'
          className='flex flex-col w-full min-w-[361px] gap-[18px]'
        >
          <div
            id='reviewFieldTop'
            className='flex flex-col w-full gap-[4px] sm:gap-[12px]'
          >
            <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] sm:font-bold text-black'>
              Review
            </p>
            <div
              id='reviewStarDisplay'
              className='flex flex-row w-full gap-[4px]'
            >
              <StarIcon className='w-[24px] h-[24px] fill-[#FFAB0D] sm:w-[30px] sm:h-[30px]' />
              <p className='font-bold text-base sm:text-xl tracking-tight sm:tracking-normal text-black'>
                Review
              </p>
            </div>
          </div>

          {/* Render all review cards here */}
          <div
            id='reviewFieldMobile'
            className='sm:hidden flex flex-col w-full min-w-[361px] gap-[18px]'
          >
            <ReviewCardSK />
            <ReviewCardSK />
            <ReviewCardSK />
          </div>
          <div
            id='reviewFieldDesktop'
            className='hidden sm:flex flex-wrap w-full gap-[20px]'
          >
            {/* Render all review cards here for Desktop ver. */}

            <ReviewCardSK />
            <ReviewCardSK />
            <ReviewCardSK />
          </div>
        </div>

        <Separator />

        <div
          id='relatedBooks'
          className='flex flex-col w-full gap-[20px] sm:gap-[40px]'
        >
          <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] sm:font-bold text-black'>
            Related Books
          </p>
          <div
            id='relatedBooksField'
            className='flex flex-wrap sm:flex-row w-full gap-[16px] sm:gap-[20px]'
          >
            {/* Render recommended books or books by author here because database doesn't really provide related books lol */}
            <BookCardS />
            <BookCardS />
            <BookCardS />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailSK;
