import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecommendedBooks } from '@/api/service/book';
import { getAllAuthors } from '@/api/service/author';

import ImgCarousel from '@/my-components/ImgCarousel';
import BookCard from '@/reusables/BookCard';
import BookCardS from '@/reusables/skeletons/BookCardS';
import AuthorCard from '@/reusables/AuthorCard';

import { Separator } from '@/components/ui/separator';

import Banner1 from '@/assets/homepageBanner.png';
import fict from '@/assets/Fict.png';
import nonfict from '@/assets/NonFict.png';
import self from '@/assets/SelfImprov.png';
import finance from '@/assets/Finance.png';
import sci from '@/assets/Science.png';
import edu from '@/assets/Edu.png';

const Home = () => {
  const navigate = useNavigate();
  const { data, isPending } = useQuery({
    queryKey: ['recommendedBooks'],
    queryFn: () => getRecommendedBooks(10),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const { data: authors } = useQuery({
    queryKey: ['authors'],
    queryFn: getAllAuthors,
  });

  const top4 = authors?.data.authors.slice(0, 4) ?? [];

  return (
    <section className='flex flex-col w-[361px] sm:w-[1200px] min-h-screen gap-[16px] sm:gap-[48px] bg-white m-auto mb-[60px] sm:mb-[100px] text-black items-center justify-center'>
      <ImgCarousel images={[Banner1]} />

      <div
        id='category'
        className='flex flex-wrap sm:flex-row w-full sm:w-[1200px] sm:m-auto gap-[12px] sm:gap-[16px] justify-center'
      >
        {/* These will be made non-functional as category backend has no image data. */}
        <button className='flex flex-col w-[112.33px] h-[132px] rounded-[16px] p-[8px] gap-[12px] sm:w-[186.67px] sm:h-[130px] sm:p-[12px] bg-white'>
          <img
            src={fict}
            alt='fict'
            className='w-[96.33px] h-[56px] rounded-[10.5px] sm:w-[162.67px] sm:h-[64px] sm:rounded-[12px]'
          />
          <p className='text-xs font-semibold sm:text-base sm:tracking-tight'>
            Fiction
          </p>
        </button>
        <button className='flex flex-col w-[112.33px] h-[132px] rounded-[16px] p-[8px] gap-[12px] sm:w-[186.67px] sm:h-[130px] sm:p-[12px] bg-white'>
          <img
            src={nonfict}
            alt='fict'
            className='w-[96.33px] h-[56px] rounded-[10.5px] sm:w-[162.67px] sm:h-[64px] sm:rounded-[12px]'
          />
          <p className='text-xs font-semibold sm:text-base sm:tracking-tight'>
            Non-Fiction
          </p>
        </button>
        <button className='flex flex-col w-[112.33px] h-[132px] rounded-[16px] p-[8px] gap-[12px] sm:w-[186.67px] sm:h-[130px] sm:p-[12px] bg-white'>
          <img
            src={self}
            alt='fict'
            className='w-[96.33px] h-[56px] rounded-[10.5px] sm:w-[162.67px] sm:h-[64px] sm:rounded-[12px]'
          />
          <p className='text-xs font-semibold sm:text-base sm:tracking-tight'>
            Self-Improvement
          </p>
        </button>
        <button className='flex flex-col w-[112.33px] h-[132px] rounded-[16px] p-[8px] gap-[12px] sm:w-[186.67px] sm:h-[130px] sm:p-[12px] bg-white'>
          <img
            src={finance}
            alt='fict'
            className='w-[96.33px] h-[56px] rounded-[10.5px] sm:w-[162.67px] sm:h-[64px] sm:rounded-[12px]'
          />
          <p className='text-xs font-semibold sm:text-base sm:tracking-tight'>
            Finance
          </p>
        </button>
        <button className='flex flex-col w-[112.33px] h-[132px] rounded-[16px] p-[8px] gap-[12px] sm:w-[186.67px] sm:h-[130px] sm:p-[12px] bg-white'>
          <img
            src={sci}
            alt='fict'
            className='w-[96.33px] h-[56px] rounded-[10.5px] sm:w-[162.67px] sm:h-[64px] sm:rounded-[12px]'
          />
          <p className='text-xs font-semibold sm:text-base sm:tracking-tight'>
            Science
          </p>
        </button>
        <button className='flex flex-col w-[112.33px] h-[132px] rounded-[16px] p-[8px] gap-[12px] sm:w-[186.67px] sm:h-[130px] sm:p-[12px] bg-white'>
          <img
            src={edu}
            alt='fict'
            className='w-[96.33px] h-[56px] rounded-[10.5px] sm:w-[162.67px] sm:h-[64px] sm:rounded-[12px]'
          />
          <p className='text-xs font-semibold sm:text-base sm:tracking-tight'>
            Education
          </p>
        </button>
      </div>

      <div
        id='recommendedBook'
        className='flex flex-col w-[361px] sm:w-[1200px] gap-[20px] sm:gap-[40px] justify-center'
      >
        <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] sm:font-black text-black'>
          Recommended
        </p>
        <div
          id='bookField'
          className='flex flex-wrap w-full gap-[12px] sm:gap-[20px] '
        >
          {/* Render recommended books here! */}
          {isPending
            ? Array.from({ length: 6 }).map((_, i) => <BookCardS key={i} />)
            : data?.data.books.map((book) => (
                <div className='cursor-pointer hover:border-[1px] border-blue-600 rounded-2xl'>
                  <BookCard
                    onClick={() => navigate(`/Detail/${book.id}`)}
                    key={book.id}
                    book={{
                      id: book.id,
                      title: book.title,
                      coverImage: book.coverImage,
                      rating: book.rating,
                    }}
                    author={{ id: book.author.id, name: book.author.name }}
                  />
                </div>
              ))}
        </div>
      </div>

      <Separator />

      <div
        id='popuAuthor'
        className='flex flex-col w-full sm:w-[1200px] gap-[20px] sm:gap-[40px]'
      >
        <p className='font-extrabold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] sm:font-black text-black'>
          Popular Authors
        </p>
        <div
          id='authorField'
          className='flex flex-col sm:flex-row w-full gap-[16px] sm:gap-[20px]'
        >
          {/* Render authors here! */}
          {top4.map((author) => (
            <AuthorCard
              onClick={() => navigate(`/Author/${author.id}`)}
              key={author.id}
              auth={author}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
