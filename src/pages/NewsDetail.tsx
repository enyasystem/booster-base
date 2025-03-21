
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: newsPost, isLoading, error } = useQuery({
    queryKey: ['news-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-[60vh] flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !newsPost) {
    return (
      <>
        <Navigation />
        <div className="min-h-[60vh] flex justify-center items-center">
          <div className="text-center max-w-md px-4">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/news">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{newsPost.title} | Booster Base Nigeria</title>
        <meta name="description" content={newsPost.excerpt || newsPost.title} />
      </Helmet>

      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/news" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to News
          </Link>
          
          <h1 className="text-4xl font-bold mb-4">{newsPost.title}</h1>
          
          <div className="flex items-center text-muted-foreground mb-8">
            <Calendar className="h-4 w-4 mr-2" />
            <time dateTime={newsPost.published_at}>
              {format(new Date(newsPost.published_at), 'MMMM d, yyyy')}
            </time>
          </div>
          
          {newsPost.image_url && (
            <div className="rounded-lg overflow-hidden mb-8 max-h-[500px]">
              <img 
                src={newsPost.image_url} 
                alt={newsPost.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        
        <Card className="mb-12">
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: newsPost.content.replace(/\n/g, '<br />') }} 
            />
          </CardContent>
        </Card>
        
        <div className="flex justify-center mt-12">
          <Link to="/news">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to News
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default NewsDetail;
