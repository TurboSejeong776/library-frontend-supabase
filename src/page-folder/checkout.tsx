import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import type { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { borrowBook } from '@/api/service/borrow';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import CheckoutCard from '@/reusables/CheckoutCard';

import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { CalendarIcon } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, selected } = useSelector((state: RootState) => state.cart);
  const checkoutItems = items.filter((item) => selected.includes(item.id));
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('user');
    if (data) {
      setUserInfo(JSON.parse(data));
    }
  }, []);

  const [duration, setDuration] = useState(3);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const letsBorrow = async () => {
    if (!agree1 || !agree2) {
      alert('You must agree to the terms before borrowing.');
      return;
    }
    if (checkoutItems.length === 0) return;
    try {
      for (const book of checkoutItems) {
        await borrowBook(book.id, duration);
      }
      alert('Borrow request successful!');
      const dueDate = dayjs().add(duration, 'day').format('DD/MMM/YYYY');
      navigate('/Done', { state: { dueDate } });
    } catch (err) {
      let msg = 'Something went wrong';

      if (err instanceof Error) {
        const axiosErr = err as AxiosError<{ message: string }>;
        if (axiosErr.response?.data?.message) {
          msg = axiosErr.response.data.message;
        } else {
          msg = err.message;
        }
      }

      toast(msg);
      console.error(err);

      toast(msg);
    }
  };

  return (
    <section
      id='base'
      className='flex flex-col w-[361px] gap-[24px] m-auto bg-white text-black sm:w-[1002px] sm:gap-[32px] mt-[60px] sm:mt-[120px] mb-[40px] sm:mb-[100px]'
    >
      <div id='checkoutTop' className='flex flex-col w-full gap-[16px]'>
        <p className='font-bold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] sm:font-black text-black'>
          Checkout
        </p>
        <div className='flex flex-col w-full gap-[16px] sm:gap-[58px] sm:flex-row '>
          <div className='flex flex-col w-full gap-[16px] sm:gap-[32px]'>
            <div className='flex flex-col w-full gap-[8px] tracking-tight'>
              <p className='font-bold text-lg sm:text-[24px] sm:tracking-normal'>
                User Information
              </p>
              <div className='flex flex-row justify-between'>
                <p className='font-medium text-sm sm:text-base'>Name</p>
                <p className='font-bold text-sm sm:text-base'>
                  {userInfo?.name || 'The Name'}
                </p>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='font-medium text-sm sm:text-base'>Email</p>
                <p className='font-bold text-sm sm:text-base'>
                  {userInfo?.email || 'The Email'}
                </p>
              </div>
              <div className='flex flex-row justify-between'>
                <p className='font-medium text-sm sm:text-base'>
                  No. Handphone
                </p>
                <p className='font-bold text-sm sm:text-base'>The Number</p>
              </div>
            </div>

            <Separator />

            <div
              id='borrowBookField'
              className='flex flex-col w-full gap-[16px]'
            >
              <p className='font-bold text-lg tracking-tight sm:text-[24px] sm:tracking-normal'>
                Book List
              </p>
              {/* Render borrow card here */}
              {checkoutItems.map((book) => (
                <CheckoutCard key={book.id} book={book} />
              ))}
            </div>
          </div>

          <div
            id='checkoutBottom'
            className='flex flex-col w-full p-[16px] gap-[16px] sm:gap-[24px] sm:p-[20px]'
          >
            <p className='font-bold text-xl tracking-tight sm:text-[28px]'>
              Complete Your Borrow Request
            </p>
            <div id='borrowDate' className='flex flex-col w-full gap-[2px]'>
              <p className='font-bold text-sm tracking-tight'>Borrow Date</p>
              <div className='flex flex-row w-full h-[48px] px-[16px] py-[8px] gap-[8px] rounded-xl bg-[#F5F5F5] border-[1px] border-[#D5D7DA] justify-between items-center'>
                <p className='font-semibold text-base tracking-tight'>
                  {dayjs().format('DD/MMMM/YYYY')}
                </p>
                <CalendarIcon className='!w-[20px] !h-[20px]' />
              </div>
            </div>

            <div
              id='borrowDura'
              className='flex flex-col w-full gap-[12px] tracking-tight'
            >
              <p className='font-bold text-sm sm:text-base'>Borrow Duration</p>
              <RadioGroup
                defaultValue='3'
                onValueChange={(val) => setDuration(Number(val))}
              >
                <div className='flex gap-[8px]'>
                  <RadioGroupItem
                    value='3'
                    id='3'
                    className='!border-[1px] !border-[#A4A7AE]'
                  />
                  <Label htmlFor='3'>
                    <p className='font-semibold text-sm'>3 Days</p>
                  </Label>
                </div>
                <div className='flex gap-[8px]'>
                  <RadioGroupItem
                    value='5'
                    id='5'
                    className='!border-[1px] !border-[#A4A7AE]'
                  />
                  <Label htmlFor='5'>
                    <p className='font-semibold text-sm'>5 Days</p>
                  </Label>
                </div>
                <div className='flex gap-[8px]'>
                  <RadioGroupItem
                    value='10'
                    id='10'
                    className='!border-[1px] !border-[#A4A7AE]'
                  />
                  <Label htmlFor='10'>
                    <p className='font-semibold text-sm'>10 Days</p>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div
              id='borrowDue'
              className='flex flex-col w-full p-[12px]tracking-tight'
            >
              <p className='font-bold text-sm sm:text-base'>Return Date</p>
              <p className='font-medium text-sm sm:text-base'>
                Please return the book no later than{' '}
                <p className='font-medium text-sm sm:text-base text-[#EE1D52]'>
                  {dayjs().add(duration, 'day').format('DD/MMM/YYYY')}
                </p>
              </p>
            </div>

            <div
              id='borrowAgreement'
              className='flex flex-col w-full gap-[8px] tracking-tight'
            >
              <div className='flex flex-row w-full gap-[8px] items-center'>
                <Checkbox
                  id='agree1'
                  checked={agree1}
                  onCheckedChange={(val) => setAgree1(val === true)}
                  className='!w-[20px] !h-[20px] rounded-sm !border-[1px] !border-[#A4A7AE] data-[state=checked]:!bg-[#1C65DA]'
                />
                <p className='font-semibold text-sm sm:text-base'>
                  I agree to return the books before the due date.
                </p>
              </div>
              <div className='flex flex-row w-full gap-[8px] items-center'>
                <Checkbox
                  id='agree2'
                  checked={agree2}
                  onCheckedChange={(val) => setAgree2(val === true)}
                  className='!w-[20px] !h-[20px] rounded-sm !border-[1px] !border-[#A4A7AE] data-[state=checked]:!bg-[#1C65DA]'
                />
                <p className='font-semibold text-sm sm:text-base'>
                  I accept the library borrowing policy.
                </p>
              </div>
            </div>

            <Button
              onClick={letsBorrow}
              disabled={checkoutItems.length === 0}
              className='!bg-[#1C65DA] !hover:bg-[#3a85ff] w-full h-[48px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'
            >
              Confirm & Borrow
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
