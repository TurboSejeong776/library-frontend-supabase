import type { CartBook } from '@/types/book-types';

import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

type CartCardProps = {
  book: CartBook;
  checked: boolean;
  onCheckedChange: (val: boolean) => void;
};

const CartCard: React.FC<CartCardProps> = ({
  book,
  checked,
  onCheckedChange,
}) => {
  return (
    <section className='flex flex-row w-[314px] gap-[16px] sm:w-[340px] bg-white text-black'>
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className='!w-[20px] !h-[20px] rounded-sm !border-[1px] !border-[#A4A7AE] data-[state=checked]:!bg-[#1C65DA]'
      />
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

export default CartCard;
