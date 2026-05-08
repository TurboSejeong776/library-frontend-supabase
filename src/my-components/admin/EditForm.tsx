import UploadImage from '../ImageForm';

import { useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { getAllAuthors } from '@/api/service/author';
import { getCategories, getBookById, updateBook } from '@/api/service/book';
import type { PostBook } from '@/types/book-types';

import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ArrowLeft } from 'lucide-react';

const bookSchema = z.object({
  title: z.string().min(5, {
    message: '',
  }),
  description: z.string().min(5, {
    message: '',
  }),
  isbn: z.string().min(5, {
    message: '',
  }),
  publishedYear: z.number().min(5, {
    message: '',
  }),
  coverImage: z.string().min(5, {
    message: '',
  }),
  authorId: z.number().min(1, {
    message: '',
  }),
  categoryId: z.number().min(1, {
    message: '',
  }),
  totalCopies: z.number().min(1, {
    message: '',
  }),
  availableCopies: z.number().min(1, {
    message: '',
  }),
});

type FormValues = z.infer<typeof bookSchema>;

const EditForm = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const parsedBookId = Number(bookId);
  const navigate = useNavigate();
  const { data: book, isLoading: isBookLoading } = useQuery({
    queryKey: ['book', parsedBookId],
    queryFn: () => getBookById(parsedBookId),
    enabled: !!parsedBookId,
  });
  const form = useForm<FormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: book?.data
      ? { ...book.data, coverImage: book.data.coverImage ?? '' }
      : {
          title: '',
          description: '',
          isbn: '',
          publishedYear: new Date().getFullYear(),
          coverImage: '',
          authorId: 0,
          categoryId: 0,
          totalCopies: 1,
          availableCopies: 1,
        },
  });

  useEffect(() => {
    if (book?.data) {
      form.reset({
        ...book.data,
        coverImage: book.data.coverImage ?? '',
      });
    }
  }, [book, form]);

  const updateBookMutation = useMutation({
    mutationFn: (payload: PostBook) => updateBook(parsedBookId, payload),
    onSuccess: (data) => {
      console.log('Book updated successfully:', data);
      navigate('/Admin');
    },
    onError: (error) => {
      console.error('Failed to update book:', error);
    },
  });

  const onSubmit = (data: FormValues) => {
    updateBookMutation.mutate(data);
  };

  const fileToBase64 = (file: File) =>
    new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const {
    data: authors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = useQuery({
    queryKey: ['authors'],
    queryFn: getAllAuthors,
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (isAuthorsLoading || isCategoriesLoading) return <p>Loading...</p>;
  if (isAuthorsError || isCategoriesError) return <p>Error loading data</p>;
  if (isBookLoading) return <p>Loading book...</p>;

  return (
    <section className='flex flex-col w-full gap-[16px] sm:mx-[28px] my-[72px] sm:my-[96px] bg-white text-black justify-center items-center'>
      <div className='flex flex-row w-full gap-[6px] items-center justify-baseline'>
        <ArrowLeft className='w-[24px] h-[24px]' onClick={() => navigate(-1)} />
        <p className='font-bold text-[24px] leading-[36px] sm:text-[28px] sm:leading-[38px] sm:font-extrabold text-black'>
          Edit Book
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col min-w-[375px] gap-4'
        >
          {/* Title */}
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Book title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name='authorId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select author' />
                    </SelectTrigger>
                    <SelectContent className='flex flex-col min-w-full'>
                      {authors?.data.authors.map((author) => (
                        <SelectItem
                          key={author.id}
                          value={author.id.toString()}
                        >
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(val) => field.onChange(Number(val))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select category' />
                    </SelectTrigger>
                    <SelectContent className='flex flex-col min-w-full'>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ISBN */}
          <FormField
            control={form.control}
            name='isbn'
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder='ISBN number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Published Year */}
          <FormField
            control={form.control}
            name='publishedYear'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published Year</FormLabel>
                <FormControl>
                  <Input type='number' placeholder='2025' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder='Book description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image */}
          <FormField
            control={form.control}
            name='coverImage'
            render={({ field }) => (
              <UploadImage
                file={null}
                deleteClears={false}
                onChange={async (file) => {
                  if (!file) return field.onChange(field.value);
                  const base64 = await fileToBase64(file);
                  field.onChange(base64 as string);
                }}
              />
            )}
          />

          <Button
            type='submit'
            className='bg-blue-600 text-white'
            disabled={updateBookMutation.isPending}
          >
            {updateBookMutation.isPending ? 'Aye aye, sir!' : 'Submit'}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default EditForm;
