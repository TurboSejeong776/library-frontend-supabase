import { useEffect, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';

import type { BookCategory } from '@/types/book-types';
import { getCategories } from '@/api/service/book';

import { Star } from 'lucide-react';

type FilterSheetProps = {
  selectedCategories: number[];
  onFilterChange: (filters: { categories: number[] }) => void;
};

const FilterSheet = ({
  selectedCategories,
  onFilterChange,
}: FilterSheetProps) => {
  const [categories, setCategories] = useState<BookCategory[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (id: number) => {
    onFilterChange({ categories: [id] });
  };
  return (
    <section className='flex flex-col w-[298px] p-[16px] gap-[8px] bg-white text-black'>
      <div
        id='filterBody'
        className='mt-[50px] flex flex-col w-[266px] py-[16px] gap-[12px]'
      >
        <div
          id='filterTOP'
          className='flex flex-col w-full gap-[10px] justify-center'
        >
          <p className='font-bold text-base tracking-tight'>FILTER</p>
          <p className='font-extrabold text-base'>Category</p>

          <div
            id='fictFilter'
            className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className='flex items-center gap-2 h-[28px]'
              >
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onClick={() => handleCategoryClick(category.id)}
                  className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]'
                />
                <p className='text-sm tracking-tight'>{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='w-full h-[1px] bg-[#D5D7DA]' />

        <div id='filterBottom' className='flex flex-col w-full gap-[10px]'>
          <p className='font-extrabold text-base'>Rating</p>
          <div id='ratingList' className='flex flex-col w-full'>
            {/* the rating-based filter is just a dummy because the back-end API filter doesn't support rating-based filter */}
            <div
              id='5star'
              className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
            >
              <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
              <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
              <p className='text-sm tracking-tight'>5</p>
            </div>
            <div
              id='4star'
              className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
            >
              <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
              <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
              <p className='text-sm tracking-tight'>4</p>
            </div>
            <div
              id='3star'
              className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
            >
              <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
              <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
              <p className='text-sm tracking-tight'>3</p>
            </div>
            <div
              id='2star'
              className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
            >
              <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
              <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
              <p className='text-sm tracking-tight'>2</p>
            </div>
            <div
              id='1star'
              className='bg-none flex flex-row w-full h-[28px] gap-[8px] items-center'
            >
              <Checkbox className='w-[20px] h-[20px] rounded-sm border-[1px] border-[#A4A7AE]' />
              <Star className='w-[24px] h-[24px] text-[#FFAB0D] fill-[#FFAB0D]' />
              <p className='text-sm tracking-tight'>1</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FilterSheet;
