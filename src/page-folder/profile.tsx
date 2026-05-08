import { useSearchParams } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ProfileInfo from '@/my-components/ProfileInfo';
import BorrowList from '@/my-components/BorrowList';
import ReviewList from '@/my-components/ReviewList';

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') ?? 'profile';

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };
  return (
    <section className='flex flex-col w-[361px] sm:w-[1200px] min-h-screen gap-[16px] m-auto mt-[90px]'>
      <Tabs
        value={tabFromUrl}
        onValueChange={handleTabChange}
        className='flex w-full h-[56px] gap-[8px] p-[8px] sm:w-full'
      >
        <TabsList className='sm:w-[557px]'>
          <TabsTrigger value='profile'>Profile</TabsTrigger>
          <TabsTrigger value='borrowList'>Borrowed List</TabsTrigger>
          <TabsTrigger value='reviewList'>Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value='profile'>
          <ProfileInfo />
        </TabsContent>
        <TabsContent value='borrowList'>
          <BorrowList />
        </TabsContent>
        <TabsContent value='reviewList'>
          <ReviewList />
        </TabsContent>
      </Tabs>
    </section>
  );
};
export default Profile;
