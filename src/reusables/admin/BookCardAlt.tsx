import { useNavigate } from 'react-router-dom';

import type { Book } from '@/types/book-types';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { StarIcon, Ellipsis } from 'lucide-react';

type BookCardProp = {
  book: Book;
};

const AdminBookCard: React.FC<BookCardProp> = ({ book }) => {
  const navigate = useNavigate();
  return (
    <section
      id='base'
      className='flex flex-row w-[361px] rounded-[16px] p-[16px] gap-[16px] bg-white text-black sm:w-full sm:p-[20px] sm:gap-[20px]'
    >
      <div className='flex flex-col sm:flex-row w-full gap-[12px] sm:gap-none sm:justify-between'>
        <img
          src={book.coverImage}
          alt='cover plz'
          className='w-[92px] h-[138px]'
        />
        <div className='flex flex-col w-[196px] gap-[4px]'>
          {/* Backend doesn't provide book category in the GET loan section */}
          <Badge variant='outline'>
            <p className='font-bold text-sm tracking-tight'>
              {book.category.name}
            </p>
          </Badge>
          <p className='font-bold text-base sm:text-xl tracking-tight'>
            {book.title}
          </p>
          {/* Backend doesn't provide book author in the GET loan section */}
          <p className='font-medium text-sm sm:text-base tracking-tight'>
            {book.author.name}
          </p>
          <div className='flex flex-row w-full gap-[2px]'>
            <StarIcon className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
            <p className='font-semibold text-sm sm:text-base tracking-tight'>
              {book.rating}
            </p>
          </div>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Ellipsis className='!w-[24px] !h-[24px] sm:hidden !text-black' />
        </PopoverTrigger>
        <PopoverContent className='flex flex-col w-[154px] p-[16px] gap-[16px] rounded-[16px]'>
          <Button variant='outline'>
            <p className='font-bold text-base tracking-tight'>Preview</p>
          </Button>
          <Button
            onClick={() => navigate(`/Admin/EditBook/${book.id}`)}
            variant='outline'
          >
            <p className='font-bold text-base tracking-tight'>Edit</p>
          </Button>
          <Button variant='outline'>
            <p className='font-bold text-base tracking-tight text-[#EE1D52]'>
              Delete
            </p>
          </Button>
        </PopoverContent>
      </Popover>
      <div className='flex flex-row gap-[13px]'>
        <Button variant='outline'>
          <p className='font-bold text-base tracking-tight'>Preview</p>
        </Button>
        <Button
          onClick={() => navigate(`/Admin/EditBook/${book.id}`)}
          variant='outline'
        >
          <p className='font-bold text-base tracking-tight'>Edit</p>
        </Button>
        <Button variant='outline'>
          <p className='font-bold text-base tracking-tight text-[#EE1D52]'>
            Delete
          </p>
        </Button>
      </div>
    </section>
  );
};

export default AdminBookCard;
