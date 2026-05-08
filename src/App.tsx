import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Logi from './page-folder/login';
import Regi from './page-folder/register';

import HomePage from './page-folder/homepage';
import Filter from './page-folder/filter';
import Detail from './page-folder/detail';
import Cart from './page-folder/cart';
import Checkout from './page-folder/checkout';
import Success from './page-folder/success';

import Author from './page-folder/author';
import Profile from './page-folder/profile';

{
  /* Admin exclusives */
}
import Admin from './page-folder/admin';
import Preview from './page-folder/preview';
import BookForm from './my-components/admin/BookForm';
import EditForm from './my-components/admin/EditForm';

import Navbar from './my-components/Navbar';
import Footer from './my-components/Footer';

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const hideHF = ['/', '/register'];
  const showHeadFoot = !hideHF.includes(location.pathname.toLowerCase());

  return (
    <section className='font-quicksand'>
      {showHeadFoot && <Navbar />}
      <Toaster
        richColors
        className='w-full h-[40px] px-[12px] py-[8px] gap-[8px] rounded-[8px]'
      />
      <Routes>
        <Route path='/' element={<Logi />} />
        <Route path='/Register' element={<Regi />} />
        <Route path='/Home' element={<HomePage />} />

        <Route path='/Filter' element={<Filter />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Checkout' element={<Checkout />} />
        <Route path='/Done' element={<Success />} />

        <Route path='/Detail/:id' element={<Detail />} />
        <Route path='/Author/:id' element={<Author />} />

        <Route path='/Profile' element={<Profile />} />
        <Route path='/Admin' element={<Admin />} />
        <Route path='/Preview/:id' element={<Preview />} />
        <Route path='/Admin/AddBook' element={<BookForm />} />
        <Route path='/Admin/EditBook/:bookId' element={<EditForm />} />
      </Routes>
      {showHeadFoot && <Footer />}
    </section>
  );
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
