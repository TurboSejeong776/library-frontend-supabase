import type { Author } from '@/types/author-types';

type UserProps = {
  user: Author;
};

{
  /* Due to backend not providing any "list user" API, author will be used instead. */
}
const UserCard: React.FC<UserProps> = ({ user }) => {
  return (
    <section className='flex flex-col sm:flex-row w-full p-[12px] gap-[4px] bg-white text-black sm:justify-between sm:items-center sm:border-b-[1px] sm:border-b-[#D5D7DA] '>
      <div className='flex flex-row justify-between sm:hidden'>
        <p className='font-medium text-sm sm:text-base'>No</p>
        <p className='font-bold text-sm sm:text-base'>{user.id}</p>
      </div>
      <div className='flex flex-row justify-between sm:hidden'>
        <p className='font-medium text-sm sm:text-base'>Name</p>
        <p className='font-bold text-sm sm:text-base'>{user.name}</p>
      </div>
      <div className='flex flex-row justify-between sm:hidden'>
        <p className='font-medium text-sm sm:text-base'>Email</p>
        <p className='font-bold text-sm sm:text-base'>Email not provided</p>
      </div>
      <div className='flex flex-row justify-between sm:hidden'>
        <p className='font-medium text-sm sm:text-base'>Phone</p>
        <p className='font-bold text-sm sm:text-base'>
          Phone number not provided
        </p>
      </div>
      <div className='flex flex-row justify-between sm:hidden'>
        <p className='font-medium text-sm sm:text-base'>Created at</p>
        <p className='font-bold text-sm sm:text-base'>{user.createdAt}</p>
      </div>
      <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
        {user.id}
      </div>
      <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
        {user.name}
      </div>
      <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
        -
      </div>
      <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
        -
      </div>
      <div className='hidden sm:flex w-[281px] h-[64px] px-[16px] gap-[8px] items-center font-bold'>
        {user.createdAt}
      </div>
    </section>
  );
};

export default UserCard;
