import { register } from '@/api/service/auth';
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

const regiSchema = z
  .object({
    name: z.string().min(2, {
      message: "Your name has only 1 character? Nuh uh, don't lie.",
    }),
    email: z.email({ message: 'Invalid email address' }),
    pass: z.string().min(5, {
      message:
        'Password so weak, nobody would bother hack it. Enter at minimum 5 characters.',
    }),
    conpass: z.string().min(5, {
      message: 'Hey hey, password should contain 5 or more characters!',
    }),
  })
  .refine((data) => data.pass === data.conpass, {
    message: 'Passwords do not match',
    path: ['conpass'],
  });

const Regi = () => {
  const navigate = useNavigate();

  const regiForm = useForm<z.infer<typeof regiSchema>>({
    resolver: zodResolver(regiSchema),
    defaultValues: {
      name: '',
      email: '',
      pass: '',
      conpass: '',
    },
  });

  const onRegister = async (data: z.infer<typeof regiSchema>) => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.pass,
    };

    console.log('Register payload:', payload);

    try {
      const res = await register(payload);
      toast(`Registration success! Welcome, ${res.data.name}! `, {
        style: {
          background: '#079455',
          color: '#FAFAFA',
        },
      });
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const response = err.response?.data as {
          message?: string;
          errors?: Array<{ field?: string; message: string }>;
        };
        console.error('Registration error payload:', response);
        if (response?.errors?.length) {
          response.errors.forEach((e) =>
            console.error(
              `Field: ${e.field ?? 'unknown'}, Message: ${e.message}`
            )
          );
        }
        toast(
          response?.message ||
            response?.errors?.map((e) => e.message).join('\n') ||
            'Registration failed',
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
        className='flex flex-col w-[324px] h-[419px] sm:w-[374px] sm:h-[658px] m-auto gap-[20px] sm:gap-[20px] bg-white text-black'
      >
        <img
          src={Lazy}
          alt='Booky here!'
          className='w-[114.43px] h-[32px] sm:w-[149px] sm:h-[42px] -mb-[2px]'
        />

        <Form {...regiForm}>
          <div className='flex flex-col w-full gap-[2px] sm:gap-[8px] items-baseline'>
            <p className='font-extrabold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-black text-black'>
              Register
            </p>
            <p className='font-mediums sm:font-semibold text-sm sm:text-base sm:tracking-tight'>
              Create your account to start borrowing books.
            </p>
          </div>
          <form
            onSubmit={regiForm.handleSubmit(onRegister)}
            className='flex flex-col gap-[16px] sm:gap-[20px]'
          >
            <FormField
              control={regiForm.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-bold tracking-tight'>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='string'
                      placeholder='Name'
                      className='text-[#717680] text-sm tracking-tight w-full h-[42px] bg-transparent'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={regiForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-bold tracking-tight'>
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='email'
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
              control={regiForm.control}
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
            <FormField
              control={regiForm.control}
              name='conpass'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-sm font-bold tracking-tight'>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Confirm password'
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
              className='!bg-[#1C65DA] hover:!bg-[#3a85ff] w-full h-[44px] sm:h-[48px] flex !rounded-full p-[8px] gap-[8px] !font-bold text-sm sm:text-base tracking-tight text-white'
            >
              Register
            </Button>
          </form>

          <div className='flex flex-row w-full items-center justify-center'>
            <p className='font-semibold text-sm tracking-tight'>
              Already have an account?
            </p>
            <button
              onClick={() => navigate('/')}
              className='!font-semibold !text-sm !tracking-tight text-[#1C65DA]'
            >
              Log In
            </button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default Regi;
