import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const emailSchema = z.object({
  newEmail: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password is required'),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export default function EmailChangeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      newEmail: '',
      password: '',
    },
  });

  const onSubmit = async (data: EmailFormValues) => {
    setIsLoading(true);
    try {
      // Re-authenticate user
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('User not found');
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: data.password,
      });
      if (signInError) {
        toast({
          title: 'Error',
          description: 'Password is incorrect',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      // Update email
      const { error } = await supabase.auth.updateUser({ email: data.newEmail });
      if (error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Email updated. Please check your new email to confirm.',
        });
        form.reset();
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter new email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
          Update Email
        </Button>
      </form>
    </Form>
  );
}
