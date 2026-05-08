import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { Book } from '@/types/book-types';
import { getBooks } from '@/api/service/book';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

import Logo from '@/assets/Logo.png';
import Lazy from '@/assets/LazyLogo.png';
import Man from '@/assets/Man.png';

import { ShoppingBag, SearchIcon, X } from 'lucide-react';

import Searchbar from './Searchbar';
import BookCard from '@/reusables/BookCard';

const Navbar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem('token'))
  );

  useEffect(() => {
    const handler = () => setIsLoggedIn(Boolean(localStorage.getItem('token')));
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const booksQuery = useQuery({
    queryKey: ['books', keyword],
    queryFn: () => getBooks({ q: keyword, limit: 5 }),
    enabled: !!keyword,
  });

  const results = booksQuery.data?.data.books ?? [];

  return (
    <section
      id='baseBody'
      className={`fixed top-0 flex z-5000 flex-row w-full h-[64px] sm:h-[80px]  items-center justify-between px-[16px] sm:px-[120px] bg-white text-black`}
    >
      <img
        id='mobileCompanyLogo'
        src={Logo}
        onClick={() => navigate('/Home')}
        alt='companyLogoHere'
        className='sm:hidden flex w-[40px] h-[40px] cursor-pointer'
      />
      <img
        id='desktopCompanyLogo'
        src={Lazy}
        onClick={() => navigate('/Home')}
        alt='companyLogoHere'
        className='hidden sm:flex w-[155px] h-[42px] cursor-pointer'
      />

      <div id='desktopSearch' className='sm:flex hidden'>
        <Popover open={!!keyword} onOpenChange={() => {}}>
          {/* Use a div as trigger instead of input */}
          <PopoverTrigger asChild>
            <div>
              <Searchbar setKeyword={setKeyword} keyword={keyword} />
            </div>
          </PopoverTrigger>

          <PopoverContent className='w-[600px] max-h-[600px] overflow-y-auto'>
            {booksQuery.isLoading && (
              <p className='p-2 text-sm text-gray-500'>Loading...</p>
            )}
            {booksQuery.isError && (
              <p className='p-2 text-sm text-red-500'>Failed to load results</p>
            )}
            {!booksQuery.isLoading &&
              !booksQuery.isError &&
              results.length > 0 && (
                <div className='flex flex-wrap gap-[8px] p-[8px] items-center'>
                  {results.map((book: Book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      author={book.author}
                      onClick={() => {
                        navigate(`/Detail/${book.id}`);
                        setKeyword('');
                      }}
                    />
                  ))}
                </div>
              )}
            {!booksQuery.isLoading && keyword && results.length === 0 && (
              <p className='p-2 text-sm text-gray-500'>No results found</p>
            )}
          </PopoverContent>
        </Popover>
      </div>

      <div
        id='navButtons'
        className='flex flex-row min-w-[124px] h-[40px] gap-[16px] items-center'
      >
        <div className='flex sm:hidden'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='ghost'
                className='!w-[40px] !h-[40px] !p-0 !flex !items-center !justify-center'
              >
                <SearchIcon className='!w-[24px] !h-[24px]' />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Searchbar setKeyword={setKeyword} keyword={keyword} />
              {booksQuery.isLoading && (
                <p className='text-sm text-gray-500 mt-2'>Loading...</p>
              )}
              {booksQuery.isError && (
                <p className='text-sm text-red-500 mt-2'>
                  Failed to load results
                </p>
              )}

              {!booksQuery.isLoading &&
                !booksQuery.isError &&
                results.length > 0 && (
                  <div className='mt-2 max-h-[300px] overflow-y-auto flex flex-col gap-2'>
                    {results.map((book: Book) => (
                      <BookCard
                        key={book.id}
                        book={book}
                        author={book.author}
                        onClick={() => {
                          navigate(`/Detail/${book.id}`);
                          setKeyword('');
                          setIsOpen(false);
                        }}
                      />
                    ))}
                  </div>
                )}

              {!booksQuery.isLoading && keyword && results.length === 0 && (
                <p className='text-sm text-gray-500 mt-2'>No results found</p>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <Button
          onClick={() => {
            if (!isLoggedIn) {
              navigate('/');
              return;
            }

            navigate('/Cart');
          }}
          className='!w-[40px] !h-[40px] !p-0 !flex !items-center !justify-center'
        >
          <ShoppingBag className='!w-[24px] !h-[24px] sm:!w-[32px] sm:!h-[32px] text-black' />
          {/* redirects to login page if user isn't logged in */}
        </Button>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger className='!w-[40px] !h-[40px] !p-0 !flex !items-center !justify-center'>
            <Button className='!w-[40px] !h-[40px] !p-0 !flex !items-center !justify-center'>
              {isOpen ? (
                <X className='!w-[40px] !h-[40px] !text-black' />
              ) : (
                <img
                  src={Man}
                  alt='There can be no alt'
                  className='w-[40px] h-[40px]'
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='flex flex-row w-full sm:w-[184px] gap-[16px] p-[16px]'>
            {isLoggedIn ? (
              <div className='flex flex-col w-full gap-[16px]'>
                <p
                  onClick={() => navigate('/Profile')}
                  className='font-semibold text-base tracking-tight'
                >
                  Profile
                </p>
                <p
                  onClick={() => navigate('/Profile?tab=borrowList')}
                  className='font-semibold text-base tracking-tight'
                >
                  Borrowed List
                </p>
                <p
                  onClick={() => navigate('/Profile?tab=reviewList')}
                  className='font-semibold text-base tracking-tight'
                >
                  Reviews
                </p>
                <p
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    setIsOpen(false);
                  }}
                  className='font-semibold text-base tracking-tight text-[#EE1D52]'
                >
                  Logout
                </p>
              </div>
            ) : (
              <div className='flex flex-row sm:flex-col w-full gap-[16px]'>
                <Button
                  onClick={() => navigate('/')}
                  variant='ghost'
                  className='w-full h-[40px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-black'
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/Register')}
                  className='!bg-[#1C65DA] !hover:bg-[#3a85ff] w-full h-[40px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'
                >
                  Register
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
};

export default Navbar;
