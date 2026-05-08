import { login } from '@/api/service/auth';
import { AxiosError } from 'axios';

import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import Lazy from '@/assets/LazyLogo.png';

const logiSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  pass: z.string().min(5, {
    message:
      'Pretty sure we put a safeguard that says "minimum of 5 character" during registry.',
  }),
});

const Logi = () => {
  const navigate = useNavigate();
  const logiForm = useForm<z.infer<typeof logiSchema>>({
    resolver: zodResolver(logiSchema),
    defaultValues: {
      email: '',
      pass: '',
    },
  });

  const onLogin = async (data: z.infer<typeof logiSchema>) => {
    try {
      const res = await login({ email: data.email, password: data.pass });
      sessionStorage.setItem('token', res.data.token);

      sessionStorage.setItem('user', JSON.stringify(res.data.user));
      toast('Welcome back!', {
        style: {
          background: '#079455',
          color: '#FAFAFA',
        },
      });
      if (res.data.user.role === 'ADMIN') {
        navigate('/Admin');
      } else {
        navigate('/Home');
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const response = err.response?.data as {
          message?: string;
          errors?: string[];
        };
        toast(
          response?.message || response?.errors?.join('\n') || 'Login failed',
          {
            style: {
              background: '#D9206E',
              color: '#FAFAFA',
            },
          }
        );
      } else if (err instanceof Error) {
        toast(err.message, {
          style: {
            background: '#D9206E',
            color: '#FAFAFA',
          },
        });
      } else {
        toast('Dunno man, some error I guess', {
          style: {
            background: '#D9206E',
            color: '#FAFAFA',
          },
        });
      }
    }
  };

  return (
    <section className='flex flex-col w-screen item-center'>
      <div
        id='base'
        className='flex flex-col w-[324px] h-[419px] sm:w-[374px] sm:h-[658px] m-auto gap-[20px] sm:gap-[20px] bg-white text-black justify-center'
      >
        <img
          src={Lazy}
          alt='Booky here!'
          className='w-[114.43px] h-[32px] sm:w-[149px] sm:h-[42px] -mb-[2px]'
        />

        <Form {...logiForm}>
          <div className='flex flex-col w-full gap-[2px] sm:gap-[8px] items-baseline'>
            <p className='font-extrabold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-black text-black'>
              Login
            </p>
            <p className='font-mediums sm:font-semibold text-sm sm:text-base sm:tracking-tight'>
              Sign in to manage your library account.
            </p>
          </div>

          <form
            onSubmit={logiForm.handleSubmit(onLogin)}
            className='flex flex-col gap-[16px] sm:gap-[20px]'
          >
            <FormField
              control={logiForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-bold tracking-tight'>
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='string'
                      placeholder='Email'
                      className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={logiForm.control}
              name='pass'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-bold tracking-tight'>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Password'
                      className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              onClick={() => {}}
              className='!bg-[#1C65DA] hover:!bg-[#3a85ff] w-full h-[44px] sm:h-[48px] flex !rounded-full p-[8px] gap-[8px] !font-bold !text-sm sm:text-base tracking-tight text-white'
            >
              Login
            </Button>
          </form>

          <div className='flex flex-row w-full items-center justify-center'>
            <p className='font-semibold text-sm tracking-tight'>
              Don't have an account?
            </p>
            <button
              onClick={() => navigate('/register')}
              className='!font-semibold !text-sm !tracking-tight text-[#1C65DA]'
            >
              Register
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Logi;
