import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Navigation from '@/components/Navigation';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";

// Define interface for contact submission
interface ContactSubmission {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  type?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

const formSchema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Send form data to Formspree
      const response = await fetch("https://formspree.io/f/movdqqll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: values.full_name,
          email: values.email,
          subject: values.company,
          message: values.message
        })
      });
      const data = await response.json();
      if (data.ok || response.status === 200) {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you as soon as possible.",
        });
        form.reset();
      } else {
        throw new Error("Formspree error");
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact</h1>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto mb-16">
          <div className="text-center mb-12">
            <p className="text-lg mb-6">
              THIS FORM CAN BE USED FOR MAKING ENQUIRIES, QUOTATIONS, AND SUBMITTING PROPOSALS AND PREFERENCES
            </p>
            <p className="text-muted-foreground mb-6">
              If you are coming to see us, you may let us know via the contact form. You can also come to see us following the map directions above and the address below or contact us using the telephone lines listed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Map Section */}
            <div className="w-full h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.8147220796797!2d8.876387!3d9.962264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105373947c9e53d7%3A0x6eb6bf2e93e5b95f!2sFarin%20Gada%20Rd%2C%20Barakin%20Yampita%2C%20Plateau!5e0!3m2!1sen!2sng!4v1680000000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-muted-foreground">
                No. 1 Hwoll, Behind Vochmal Petro Station, Zaria Road,<br />
                  Farin Gada, Jos, Plateau State, Nigeria
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">+234 803 891 3567</p>
                <p className="text-muted-foreground">+234 802 828 9711</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">info@boosterbaseng.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-card p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Contact Form</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message" 
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full button-primary flex items-center justify-center space-x-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
