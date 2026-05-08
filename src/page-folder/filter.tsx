import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBooks } from '@/api/service/book';
import { useNavigate } from 'react-router-dom';

import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { ListFilter } from 'lucide-react';

import FilterSheet from '@/my-components/FilterSheet';
import BookCard from '@/reusables/BookCard';

const Filter = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const { data } = useQuery({
    queryKey: ['books', selectedCategories],
    queryFn: () =>
      getBooks({ categoryId: selectedCategories[0] ?? undefined, limit: 10 }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  return (
    <section className='flex flex-col w-screen gap-[16px] bg-white text-black'>
      <div id='bodyBase' className='flex flex-col w-[361px] gap-[16px] m-auto'>
        <p className='font-extrabold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-black text-black'>
          Book List
        </p>

        {/* For mobile */}
        <div className='sm:hidden flex flex-row w-full p-[12px] justify-between'>
          <p className='font-extrabold text-sm'>FILTER</p>
          <Sheet>
            <SheetTrigger asChild>
              <ListFilter className='text-black w-[20px] h-[20px] sm:hidden' />
            </SheetTrigger>
            <SheetContent side='left'>
              <FilterSheet
                selectedCategories={selectedCategories}
                onFilterChange={({ categories }) =>
                  setSelectedCategories(categories)
                }
              />
            </SheetContent>
          </Sheet>
        </div>
        <div
          id='bookFieldMobile'
          className='sm:hidden flex flex-wrap w-full gap-[16px]'
        >
          {/* Render books by filter here! */}
          {data?.data.books.map((book) => (
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
          ))}
        </div>

        {/* For desktop */}
        <div
          id='desktopBody'
          className='hidden sm:flex flex-row w-full gap-[40px]'
        >
          <FilterSheet
            selectedCategories={selectedCategories}
            onFilterChange={({ categories }) =>
              setSelectedCategories(categories)
            }
          />
          <div
            id='bookFieldDesktop'
            className='sm:flex flex-wrap w-full gap-[20px]'
          >
            {/* Render books by filter here! */}
            {data?.data.books.map((book) => (
              <BookCard
                key={book.id}
                book={{
                  id: book.id,
                  title: book.title,
                  coverImage: book.coverImage,
                  rating: book.rating,
                }}
                author={{ id: book.author.id, name: book.author.name }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Filter;
