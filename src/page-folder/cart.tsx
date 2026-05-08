import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { setSelected } from '@/redux/cartSlice';

import CartCard from '@/reusables/CartCard';

import { store } from '@/redux/store';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log('Cart sees via useSelector:', cartItems);
  console.log(
    'Cart sees directly from store.getState():',
    store.getState().cart.items
  );

  const selectedIds = useSelector((state: RootState) => state.cart.selected);

  useEffect(() => {
    if (selectedIds.length > 0) {
      setDrawerOpen(true);
    }
  }, [selectedIds]);

  const toggleSelect = (id: number, checked: boolean) => {
    const newSelected = checked
      ? [...selectedIds, id]
      : selectedIds.filter((x) => x !== id);

    dispatch(setSelected(newSelected));
  };

  const selectAll = (checked: boolean) => {
    if (checked) {
      dispatch(setSelected(cartItems.map((b) => b.id)));
    } else {
      dispatch(setSelected([]));
    }
  };

  useEffect(() => {
    console.log('Cart updated:', cartItems);
  }, [cartItems]);
  return (
    <section
      id='base'
      className='flex flex-col w-[361px] gap-[16px] m-auto bg-white text-black sm:w-[1000px] sm:h-[826px] sm:gap-[32px] mt-[80px] sm:mt-[120px]'
    >
      <p className='font-bold text-[24px] leading-[36px] sm:text-[36px] sm:leading-[44px] sm:font-black text-black'>
        My Cart
      </p>
      <div className='flex flex-row gap-[16px]'>
        <Checkbox
          id='selectAll'
          checked={
            selectedIds.length === cartItems.length && cartItems.length > 0
          }
          onCheckedChange={(val) => selectAll(val === true)}
          className='!w-[20px] !h-[20px] rounded-sm !border-[1px] !border-[#A4A7AE] data-[state=checked]:!bg-[#1C65DA]'
        />
        <p className='font-semibold text-sm sm:text-base tracking-tight'>
          Select All
        </p>
      </div>
      <div
        id='cartField'
        className='flex flex-col sm:flex-row w-full gap-[16px] sm:gap-[24px]'
      >
        <ScrollArea className='flex flex-col w-full h-[566px] gap-[16px]'>
          {/* Render Cart Items here with CartBook */}
          {cartItems.length > 0 ? (
            cartItems.map((book) => (
              <CartCard
                key={book.id}
                book={book}
                checked={selectedIds.includes(book.id)}
                onCheckedChange={(val) => toggleSelect(book.id, val === true)}
              />
            ))
          ) : (
            <p className='text-sm text-gray-500 p-4'>Your cart is empty.</p>
          )}
        </ScrollArea>
        <div
          id='desktopCheckout'
          className='hidden sm:flex flex-col w-[318px] h-[200px] p-[20px] gap-[24px] justify-between bg-white text-black'
        >
          <p className='font-bold text-xl tracking-tight'>Loan Summary</p>
          <div className='flex flex-row justify-between'>
            <p className='font-medium text-base tracking-tight'>Total Items</p>
            <p className='font-bold text-base tracking-tight'>
              {selectedIds.length}
            </p>
          </div>
          <Button
            onClick={() => navigate('/Checkout')}
            disabled={selectedIds.length === 0}
            className='!bg-[#1C65DA] !hover:bg-[#3a85ff] w-full h-[48px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'
          >
            Borrow
          </Button>
        </div>
      </div>

      {isMobile && (
        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerContent className='sm:hidden flex flex-row w-full h-[72px] p-[16px] justify-between bg-white text-black'>
            <div className='flex flex-col'>
              <p className='font-medium text-sm tracking-tight'>Total Items</p>
              <p className='font-bold text-sm tracking-tight'>
                {selectedIds.length}
              </p>
            </div>
            <Button
              onClick={() => navigate('/Checkout')}
              disabled={selectedIds.length === 0}
              className='!bg-[#1C65DA] !hover:bg-[#3a85ff] w-[150px] h-[40px] sm:w-[182px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'
            >
              Borrow
            </Button>
          </DrawerContent>
        </Drawer>
      )}
    </section>
  );
};

export default Cart;
