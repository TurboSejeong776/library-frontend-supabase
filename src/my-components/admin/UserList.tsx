import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAllAuthors } from '@/api/service/author';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import UserCard from '@/reusables/admin/User';
import Searchbar from '../Searchbar';

const UserList = () => {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const { data } = useQuery({
    queryKey: ['authors'],
    queryFn: getAllAuthors,
  });
  const authors = data?.data?.authors ?? [];
  const filteredAuthors = authors.filter((user) =>
    user.name.toLowerCase().includes(keyword.toLowerCase())
  );
  const total = filteredAuthors.length;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAuthors = filteredAuthors.slice(startIndex, endIndex);

  return (
    <section className='flex flex-col w-full gap-[16px] bg-white text-black sm:gap-[24px]'>
      <p className='font-bold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-extrabold text-black'>
        User
      </p>
      <Searchbar keyword={keyword} setKeyword={setKeyword} />

      <div
        id='mobileAuthField'
        className='flex flex-col w-full gap-[16px] sm:hidden'
      >
        {currentAuthors.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div
        id='desktopAuthField'
        className='hidden sm:flex flex-col w-full p-[16px] border-[1px] border-[#D5D7DA] rounded-[12px]'
      >
        <div
          id='tableTop'
          className='flex flex-row w-full p-[12px] gap-[4px] bg-white text-black justify-between border-b-[1px] border-b-[#D5D7DA] '
        >
          <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
            No
          </div>
          <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
            Name
          </div>
          <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
            Phone Number
          </div>
          <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
            Email
          </div>
          <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
            Created at
          </div>
        </div>
        {currentAuthors.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}

        {/* Le Pagination de Here (idk french) */}
        {totalPages > 1 && (
          <div className='flex flex-row w-full h-[64px] px-[24px] justify-end items-center'>
            <p className='w-[199px] font-medium text-base tracking-tight'>
              {`Showing ${startIndex + 1} to ${Math.min(
                endIndex,
                total
              )} of ${total} entries`}
            </p>

            <Pagination className='w-[347px]'>
              <PaginationContent className='w-[347px] justify-center items-center !text-black !font-medium'>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className='justify-center items-center !text-black !font-medium text-base'
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={page === i + 1}
                      onClick={() => setPage(i + 1)}
                      className='justify-center items-center !text-black !font-medium text-base'
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className='justify-center items-center !text-black !font-medium text-base'
                />
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserList;
