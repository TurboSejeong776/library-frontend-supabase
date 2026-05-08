import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { CircleCheck } from 'lucide-react';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dueDate = location.state?.dueDate || 'Hey! You sneaked here, huh?';
  return (
    <section className='flex flex-col w-[345px] m-auto gap-[24px] bg-white text-black sm:w-[638px] sm:gap-[32px]'>
      <CircleCheck className='fill-[#1C65DA] w-[117.01px] h-[117.01px]' />
      <div className='flex flex-col w-full gap-[8px]'>
        <p className='font-bold text-xl sm:text-[28px] sm:leading-[38px] tracking-tight'>
          Borrow Success!
        </p>
        <p className='font-semibold text-base sm:text-lg leading-[32px] tracking-tight'>
          Your book has been successfully borrowed. Please return it by{' '}
          <span className='text-[#EE1D52]'>{dueDate}</span>
        </p>
      </div>
      <Button
        onClick={() => navigate('/Profile')}
        className='!bg-[#1C65DA] !hover:bg-[#3a85ff] w-[286px] h-[48px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'
      >
        See Borrowed List
      </Button>
    </section>
  );
};
export default Success;
