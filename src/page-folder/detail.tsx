import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';

import { Skeleton } from '@/components/ui/skeleton';
import DetailSK from '@/reusables/skeletons/DetailSK';
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

import type { RecommendedBooks } from '@/types/book-types';

import { getRecommendedBooks } from '@/api/service/book';
import { getBookById } from '@/api/service/book';

import ReviewCard from '@/reusables/ReviewCard';
import BookCard from '@/reusables/BookCard';

import { StarIcon, Share2Icon } from 'lucide-react';
import { store } from '@/redux/store';
const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const navigate = useNavigate();
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
  console.log('Store instance in Detail:', store);
  const {
    data: recommended,
    isLoading: isRecommendedLoading,
    error: recommendedError,
  } = useQuery({
    queryKey: ['recommended'],
    queryFn: () => getRecommendedBooks(10),
    enabled: !!bookId,
  });

  if (isBookLoading || isRecommendedLoading) return <DetailSK />;
  if (bookError) return <div>Failed to load book details</div>;
  if (recommendedError) return <div>Failed to load recommended books</div>;
  if (!book) return <div>No book found</div>;
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
              <BreadcrumbPage>{book.data.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div
          id='bookDetail'
          className='flex flex-col sm:flex-row w-full gap-[36px] items-center'
        >
          {isBookLoading ? (
            <Skeleton className='w-[222.75px] h-[328.83px] border-[2px] border-[#E9EAEB] sm:w-[337px] sm:h-[498px]' />
          ) : (
            <img
              src={book.data.coverImage}
              alt='cover'
              className='w-[222.75px] h-[328.83px] border-[2px] border-[#E9EAEB] sm:w-[337px] sm:h-[498px]'
            />
          )}

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
                  {isBookLoading ? (
                    <Skeleton className='w-full h-2 bg-gray-400' />
                  ) : (
                    book.data.category.name
                  )}
                </Badge>
                <p className='font-extrabold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-black text-black'>
                  {isBookLoading ? (
                    <Skeleton className='w-full h-8 bg-gray-400' />
                  ) : (
                    book.data.title
                  )}
                </p>
                <p className='font-semibold text-sm sm:text-base tracking-tight text-[#414651]'>
                  {isBookLoading ? (
                    <Skeleton className='w-full h-8 bg-gray-400' />
                  ) : (
                    book.data.author.name
                  )}
                </p>
                <div
                  id='bookRatingDisplay'
                  className='flex flex-row w-[192px] gap-[2px]'
                >
                  <StarIcon className='w-[24px] h-[24px] fill-[#FFAB0D]' />
                  <p className='font-bold text-base tracking-tight text-black'>
                    {isBookLoading ? (
                      <Skeleton className='w-full h-8 bg-gray-400' />
                    ) : (
                      book.data.rating
                    )}
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
                    1
                  </p>
                  <p className='font-medium text-sm sm:text-base'>Page</p>
                </div>
                <Separator orientation='vertical' />
                <div
                  id='bookRateCount'
                  className='flex flex-col w-full sm:w-[102px] sm:h-[66px]'
                >
                  <p className='font-bold text-lg sm:text-[24px] sm:tracking-normal'>
                    {isBookLoading ? (
                      <Skeleton className='w-full h-8 bg-gray-400' />
                    ) : (
                      book.data.reviewCount
                    )}
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
                    {isBookLoading ? (
                      <Skeleton className='w-full h-8 bg-gray-400' />
                    ) : (
                      book.data.reviewCount
                    )}
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
              className='flex flex-col w-full sm:min-h-[128px] gap-[4px] text-black'
            >
              <p className='font-bold text-xl tracking-tight'>Description</p>
              <p className='font-medium text-sm sm:text-base tracking-tight'>
                {isBookLoading ? (
                  <>
                    <Skeleton className='w-full h-8 bg-gray-400' />
                    <Skeleton className='w-full h-8 bg-gray-400' />
                    <Skeleton className='w-full h-8 bg-gray-400' />
                  </>
                ) : (
                  book.data.description
                )}
              </p>
            </div>

            <div
              id='mobileShare'
              className='sm:hidden fixed bottom-0 flex flex-row gap-[12px] p-[16px] bg-white'
            >
              <Button
                variant='outline'
                className='p-[8px]'
                onClick={() => {
                  const bookData = {
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
                  };
                  console.log('Add to Cart button clicked');
                  dispatch(addToCart(bookData));

                  console.log('Dispatched book:', bookData);
                  console.log(
                    'Store after dispatch:',
                    store.getState().cart.items
                  );
                  console.log('Current store state:', store.getState());
                  console.log(
                    'Cart items directly from store:',
                    store.getState().cart.items
                  );
                }}
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => {
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
                  );
                  navigate('/Checkout');
                }}
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
              <Button
                onClick={() => {
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
                  );
                  navigate('/Checkout');
                }}
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
              Review{book.data.reviewCount > 1 ? 's' : ''}
            </p>
            <div
              id='reviewStarDisplay'
              className='flex flex-row w-full gap-[4px]'
            >
              <StarIcon className='w-[24px] h-[24px] fill-[#FFAB0D] sm:w-[30px] sm:h-[30px]' />
              <p className='font-bold text-base sm:text-xl tracking-tight sm:tracking-normal text-black'>
                {book.data.rating} ({book.data.reviewCount} Ulasan)
              </p>
            </div>
          </div>

          {/* Render all review cards here */}
          <div
            id='reviewFieldMobile'
            className='sm:hidden flex flex-col w-full min-w-[361px] gap-[18px]'
          >
            {book.data.reviews.length > 0 ? (
              book.data.reviews.map((review) => (
                <div className='cursor-pointer'>
                  <ReviewCard key={review.id} data={review} />
                </div>
              ))
            ) : (
              <p className='text-sm sm:text-base text-gray-500'>Empty!</p>
            )}
          </div>
          <div
            id='reviewFieldDesktop'
            className='hidden sm:flex flex-wrap w-full gap-[20px]'
          >
            {/* Render all review cards here for Desktop ver. */}
            {book.data.reviews.length > 0 ? (
              book.data.reviews.map((review) => (
                <ReviewCard key={review.id} data={review} />
              ))
            ) : (
              <p className='text-sm sm:text-base text-gray-500'>Empty!</p>
            )}
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
            {recommended?.data?.books?.map((recBook: RecommendedBooks) => (
              <div className='cursor-pointer hover:border-[1px] border-blue-600 rounded-2xl'>
                <BookCard
                  onClick={() => navigate(`/Detail/${recBook.id}`)}
                  key={recBook.id}
                  book={{
                    id: recBook.id,
                    title: recBook.title,
                    coverImage: recBook.coverImage,
                    rating: recBook.rating,
                  }}
                  author={recBook.author}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Detail;
