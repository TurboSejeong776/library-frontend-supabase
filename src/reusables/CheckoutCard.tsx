import type { CartBook } from '@/types/book-types';

import { Badge } from '@/components/ui/badge';

type CartCardProps = {
  book: CartBook;
};

const CheckoutCard: React.FC<CartCardProps> = ({ book }) => {
  return (
    <section className='flex flex-row w-[314px] gap-[16px] sm:w-[340px] bg-white text-black'>
      <div className='flex flex-row w-[278px] gap-[12px] sm:w-[304px] sm:gap-[16px]'>
        <img
          src={book.coverImage}
          alt='cover plz'
          className='w-[92px] h-[138px]'
        />
        <div className='flex flex-col w-[196px] gap-[4px]'>
          <Badge variant='outline'>
            <p className='font-bold text-sm tracking-tight'>
              {book.category.name}
            </p>
          </Badge>
          <p className='font-bold text-base sm:text-xl tracking-tight'>
            {book.title}
          </p>
          <p className='font-bold text-base sm:text-xl tracking-tight text-[#414651]'>
            {book.author.name}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CheckoutCard;
