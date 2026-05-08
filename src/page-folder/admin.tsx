import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import UserList from '@/my-components/admin/UserList';
import AdminBorrowList from '@/my-components/admin/BorrowListAdmin';
import BookList from '@/my-components/admin/BookList';

const Admin = () => {
  return (
    <section className='flex flex-col w-[361px] min-h-screen sm:w-[1200px] gap-[16px] m-auto mt-[80px] sm:mt-[120px] bg-white items-center text-black'>
      <Tabs
        defaultValue='borrowedList'
        className='w-full p-[8px] gap-[8px] rounded-[16px]'
      >
        <TabsList>
          <TabsTrigger value='borrowedList'>Borrowed List</TabsTrigger>
          <TabsTrigger value='user'>User</TabsTrigger>
          <TabsTrigger value='bookList'>Book List</TabsTrigger>
        </TabsList>
        <TabsContent value='borrowedList'>
          <AdminBorrowList />
        </TabsContent>
        <TabsContent value='user'>
          <UserList />
        </TabsContent>
        <TabsContent value='bookList'>
          <BookList />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Admin;
