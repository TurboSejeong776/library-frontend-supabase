import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { getAuthorBooks } from '@/api/service/author';

import AuthorCard from '@/reusables/AuthorCard';
import BookCard from '@/reusables/BookCard';
import BookCardS from '@/reusables/skeletons/BookCardS';
import AuthorCardS from '@/reusables/AuthorCardSK';

const Author = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const authorId = Number(id);
  const { data, isLoading } = useQuery({
    queryKey: ['authorBooks', authorId],
    queryFn: () => getAuthorBooks(authorId),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  return (
    <section className='flex flex-col w-screen bg-white text-black'>
      <div
        id='bodyBase'
        className='flex flex-col w-[361px] sm:w-[1200px] mt-[80px] sm:mt-[120px] m-auto gap-[16px] sm:gap-[24px] justify-center'
      >
        {/* Render author card here */}
        {isLoading ? (
          <AuthorCardS />
        ) : data?.data.author ? (
          <AuthorCard auth={data.data.author} />
        ) : null}
        <div
          id='authorBookBase'
          className='flex flex-col w-full gap-[16px] sm:gap-[24px] sm:mt-[16px]'
        >
          <p className='font-extrabold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-black text-black'>
            Book List
          </p>
          <div id='authorBookField' className='flex flex-wrap gap-[16px]'>
            {/* Render author's book here */}
            {isLoading
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
                      author={{
                        id: data.data.author.id,
                        name: data.data.author.name,
                      }}
                    />
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Author;
