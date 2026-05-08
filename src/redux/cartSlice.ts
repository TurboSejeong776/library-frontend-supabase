// store/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartBook } from '@/types/book-types';

export interface CartState {
  items: CartBook[];
  selected: number[];
}

const initialState: CartState = {
  items: [],
  selected: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartBook>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        console.log('Item added:', action.payload);
        console.log('State after push:', state.items);
      } else {
        console.log('Item already exists, not added:', action.payload);
      }
      console.log('Current cart items:', [...state.items]);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      console.log('removeFromCart called with ID:', action.payload);
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.selected = state.selected.filter((id) => id !== action.payload);
      console.log('Current cart items after removal:', state.items);
      console.log('Current selected IDs after removal:', state.selected);
    },
    clearCart: (state) => {
      console.log('clearCart called');
      state.items = [];
      console.log('Cart cleared, current items:', state.items);
    },
    setSelected: (state, action: PayloadAction<number[]>) => {
      console.log('setSelected called with:', action.payload);
      state.selected = action.payload;
      console.log('Current selected IDs:', state.selected);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setSelected } =
  cartSlice.actions;
export default cartSlice.reducer;
