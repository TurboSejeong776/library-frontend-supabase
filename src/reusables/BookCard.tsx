import type { Book, BookAuthor } from '@/types/book-types';
import { StarIcon } from 'lucide-react';

type BookCardProps = {
  book: Pick<Book, 'id' | 'title' | 'coverImage' | 'rating'>;
  author: Pick<BookAuthor, 'id' | 'name'>;
  onClick?: () => void;
};

const BookCard: React.FC<BookCardProps> = ({ book, author, onClick }) => {
  return (
    <section
      onClick={onClick}
      className='flex flex-col w-[172px] rounded-[16px] bg-white text-black item-center justify-center overflow-hidden'
    >
      <img
        src={book.coverImage}
        alt='cover plz'
        className='w-[200px] h-[300px]'
      />
      <div className='flex flex-col w-full gap-[2px] p-[12px] sm:gap-[4px] sm:p-[16px]'>
        <p className='font-bold text-sm sm:text-lg tracking-tight line-clamp-1'>
          {book.title ?? 'What?'}
        </p>
        <p className='font-medium text-sm sm:text-base tracking-tight line-clamp-1'>
          {author.name ?? 'Who?'}
        </p>
        <div className='flex flex-row w-full gap-[2px] items-center'>
          <StarIcon className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
          <p className='font-semibold text-sm sm:text-base tracking-tight'>
            {book.rating ?? 0}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookCard;
