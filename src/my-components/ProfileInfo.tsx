import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/service/user';

import { Button } from '@/components/ui/button';

import Man from '@/assets/Man.png';

const ProfileInfo = () => {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  if (!data) return <div>Loading...</div>;

  const { profile } = data.data;
  return (
    <section
      id='base'
      className='flex flex-col w-full gap-[16px] sm:w-[557px] sm:gap-[24px] justify-center'
    >
      <p className='font-bold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-extrabold text-black'>
        Profile
      </p>
      <div
        id='profileData'
        className='flex flex-col w-full p-[16px] gap-[16px] sm:p-[20px] sm:gap-[24px]'
      >
        <div
          id='profileDataTheDatas'
          className='flex flex-col w-full gap-[8px]'
        >
          <img src={Man} alt='pp' className='w-[64px] h-[64px]' />
          <div className='flex flex-row justify-between'>
            <p className='font-medium text-sm sm:text-base'>Name</p>
            <p className='font-bold text-sm sm:text-base'>{profile.name}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p className='font-medium text-sm sm:text-base'>Email</p>
            <p className='font-bold text-sm sm:text-base'>{profile.email}</p>
          </div>
          <div className='flex flex-row justify-between'>
            <p className='font-medium text-sm sm:text-base'>Phone</p>
            <p className='font-bold text-sm sm:text-base'>
              Not provided by backend
            </p>
          </div>
        </div>
        <Button
          onClick={() => {}}
          className='!bg-[#1C65DA] !hover:bg-[#3a85ff] w-full h-[44px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'
        >
          Update Profile
        </Button>
      </div>
    </section>
  );
};

export default ProfileInfo;
