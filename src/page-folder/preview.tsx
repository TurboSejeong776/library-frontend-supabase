import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

import { getBookById } from '@/api/service/book';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

import { StarIcon, Share2Icon } from 'lucide-react';

const Preview = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const dispatch = useDispatch();
  const {
    data: book,
    isLoading: isBookLoading,
    error: bookError,
  } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookById(bookId),
    enabled: !!bookId,
  });

  if (isBookLoading) return <div>Loading...</div>;
  if (bookError) return <div>Failed to load book details</div>;
  if (!book) return <div>No book found</div>;
  return (
    <section
      id='baseDetail'
      className='flex flex-col w-screen min-w-[393px] gap-[16px] sm:gap-none bg-white'
    >
      <div
        id='mainBody'
        className='flex flex-col w-full gap-[24px] sm:w-[1200px] sm:m-auto sm:gap-[64px]'
      >
        <div
          id='bookDetail'
          className='flex flex-col sm:flex-row w-full gap-[36px] items-center'
        >
          <img
            src={book.data.coverImage}
            alt='cover'
            className='w-[222.75px] h-[328.83px] border-[2px] border-[#E9EAEB] sm:w-[337px] sm:h-[498px]'
          />
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
                <Badge variant='outline'>{book.data.category.name}</Badge>
                <p className='font-extrabold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-black text-black'>
                  {book.data.title}
                </p>
                <p className='font-semibold text-sm sm:text-base tracking-tight text-[#414651]'>
                  {book.data.author.name}
                </p>
                <div
                  id='bookRatingDisplay'
                  className='flex flex-row w-[192px] gap-[2px]'
                >
                  <StarIcon className='w-[24px] h-[24px] fill-[#FFAB0D]' />
                  <p className='font-bold text-base tracking-tight text-black'>
                    {book.data.rating}
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
                    At least 1
                  </p>
                  <p className='font-medium text-sm sm:text-base'>Page</p>
                </div>
                <Separator orientation='vertical' />
                <div
                  id='bookRateCount'
                  className='flex flex-col w-full sm:w-[102px] sm:h-[66px]'
                >
                  <p className='font-bold text-lg sm:text-[24px] sm:tracking-normal'>
                    {book.data.reviewCount}
                  </p>
                  <p className='font-medium text-sm sm:text-base'>
                    Rating{book.data.reviewCount > 1 ? 's' : ''}
                  </p>
                </div>
                <Separator orientation='vertical' />
                <div
                  id='bookRevCount'
                  className='flex flex-col w-full sm:w-[102px] sm:h-[66px]'
                >
                  <p className='font-bold text-lg sm:text-[24px] sm:tracking-normal'>
                    {book.data.reviewCount}
                  </p>
                  <p className='font-medium text-sm sm:text-base'>
                    Review{book.data.reviewCount > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            <Separator className='sm:w-[559px]' />

            <div
              id='bookDesc'
              className='flex flex-col w-full gap-[4px] text-black'
            >
              <p className='font-bold text-xl tracking-tight'>Description</p>
              <p className='font-medium text-sm sm:text-base tracking-tight'>
                {book.data.description}
              </p>
            </div>

            <div
              id='mobileShare'
              className='sm:hidden fixed bottom-0 flex flex-row gap-[12px] p-[16px] bg-white'
            >
              <Button
                variant='outline'
                className='p-[8px]'
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: book.data.id,
                      title: book.data.title,
                      coverImage: book.data.coverImage,
                      category: {
                        id: book.data.category.id,
                        name: book.data.category.name,
                      },
                      author: {
                        id: book.data.author.id,
                        name: book.data.author.name,
                      },
                    })
                  )
                }
              >
                Add to Cart
              </Button>
              <Button variant='outline' className='p-[8px] !bg-[#1C65DA]'>
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
              <Button
                variant='outline'
                className='px-[120px]'
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: book.data.id,
                      title: book.data.title,
                      coverImage: book.data.coverImage,
                      category: {
                        id: book.data.category.id,
                        name: book.data.category.name,
                      },
                      author: {
                        id: book.data.author.id,
                        name: book.data.author.name,
                      },
                    })
                  )
                }
              >
                Add to Cart
              </Button>
              <Button variant='outline' className='px-[120px] !bg-[#1C65DA]'>
                Borrow
              </Button>
              <Button variant='outline' className='px-[120px]'>
                <Share2Icon className='w-[20px] h-[20px]' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
