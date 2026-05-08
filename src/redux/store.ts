import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import type { CartState } from './cartSlice';

const loadState = () => {
  try {
    const serialized = localStorage.getItem('cartState');
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    console.error('Failed to load cart state:', Error);
    return undefined;
  }
};

const saveState = (state: CartState) => {
  try {
    localStorage.setItem('cartState', JSON.stringify(state));
  } catch {
    console.error('Failed to save cart state:', Error);
  }
};

const preloadedState = { cart: loadState() };

export const store = configureStore({
  reducer: { cart: cartReducer },
  preloadedState,
});

store.subscribe(() => saveState(store.getState().cart));

// temporarily for debugging
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
