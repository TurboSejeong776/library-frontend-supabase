import React from 'react';
import { useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type ImgCarouselProps = {
  images: string[];
};

const ImgCarousel: React.FC<ImgCarouselProps> = ({ images }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className='flex flex-col w-full gap-[8px] justify-center items-center'>
      <Carousel className='flex flex-col gap-[12px]' setApi={setApi}>
        <CarouselContent>
          {images.map((img, i) => (
            <CarouselItem key={i}>
              <img
                src={img}
                alt='R.I.P IMG'
                className='w-[361px] h-[132.67px] rounded-[16px] sm:w-[1200px] sm:h-[441px] sm:rounded-[24px]'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div id='dots' className='flex flex-row justify-center gap-[4px]'>
          {images.map((_, i) => (
            <Button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                'w-[6px] h-[6px] !rounded-full transition-all',
                current === i ? 'bg-[#1C65DA]' : 'bg-[#D9D9D9]'
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default ImgCarousel;
