import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getBooks } from '@/api/service/book';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

import AdminBookCard from '@/reusables/admin/BookCardAlt';
import Searchbar from '../Searchbar';

const BookList = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['books', keyword],
    queryFn: () => getBooks({ q: keyword }),
  });

  const books = data?.data.books ?? [];
  const filteredBooks = keyword
    ? books.filter((book) =>
        book.title.toLowerCase().includes(keyword.toLowerCase())
      )
    : books;
  return (
    <section className='flex flex-col w-full gap-[16px] bg-white text-black sm:gap-[24px]'>
      <div className='flex flex-col w-full gap-[16px] sm:w-[600px] sm:gap-[24px]'>
        <p className='font-bold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-extrabold text-black'>
          User
        </p>
        <Button
          onClick={() => navigate('/Admin/AddBook')}
          className='!bg-[#1C65DA] !hover:bg-[#3a85ff] w-full h-[44px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'
        >
          Add Book
        </Button>
        <Searchbar keyword={keyword} setKeyword={setKeyword} />

        {/* There is a mistake with the figma design; you can't list book by Available | Returned | Borrowed. */}
        <ScrollArea className='flex flex-row w-full sm:w-[510px] gap-[8px] whitespace-nowrap'>
          <Badge variant='outline'>All</Badge>
          <Badge variant='outline'>Available</Badge>
          <Badge variant='outline'>Borrowed</Badge>
          <Badge variant='outline'>Returned</Badge>
        </ScrollArea>
      </div>

      <div id='bookField' className='flex flex-col w-full gap-[16px]'>
        {/**Render all card here */}
        {isLoading && <p>Loading...</p>}
        {error && <p className='text-red-500'>Failed to fetch books</p>}
        {filteredBooks.map((book) => (
          <AdminBookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookList;
