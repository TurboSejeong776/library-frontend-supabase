import fb from '@/assets/SocialMedia/facebook.png';
import ins from '@/assets/SocialMedia/Instagram.png';
import link from '@/assets/SocialMedia/LinkedIn.png';
import tiktok from '@/assets/SocialMedia/TikTok.png';
import Lazy from '@/assets/LazyLogo.png';

const Footer = () => {
  return (
    <section className='flex flex-col w-screen border-t-[1px] border-t-[#D5D7DA] px-[16px] py-[40px] gap-[24px] bg-white text-black sm:justify-between sm:gap-none sm:px-[150px] sm:py-[80px] items-center'>
      <div
        id='footerMainBody'
        className='flex flex-col w-full gap-[16px] sm:gap-[40px] items-center justify-center'
      >
        <div
          id='footerMainBodyTop'
          className='flex flex-col w-full gap-[16px] sm:gap-[22px] items-center justify-center'
        >
          <img
            src={Lazy}
            alt='logo here'
            className='w-[141.43px] sm:w-[155px] h-[42px]'
          />
          <p className='font-semibold text-sm tracking-tight text-center sm:text-base'>
            Discover inspiring stories & timeless knowledge, ready to borrow
            anytime. Explore online or visit our nearest library branch.
          </p>
        </div>
        <div
          id='footerMainBodyBottom'
          className='flex flex-col w-[196px] gap-[20px]'
        >
          <p className='font-bold text-sm text-center tracking-tight sm:text-base'>
            Follow on Social Media
          </p>
          <div id='socialIcons' className='flex flex-row w-full gap-[12px]'>
            <img src={fb} alt='facebookLogo' className='w-[40px] h-[40px]' />
            <img src={ins} alt='instagramLogo' className='w-[40px] h-[40px]' />
            <img src={link} alt='linkedInLogo' className='w-[40px] h-[40px]' />
            <img src={tiktok} alt='tikTokLogo' className='w-[40px] h-[40px]' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
