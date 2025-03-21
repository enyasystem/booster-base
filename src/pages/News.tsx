
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Calendar, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import type { NewsPost } from '@/types/news';
import { useEffect } from 'react';

const News = () => {
  const { data: newsPosts, isLoading, error, refetch } = useQuery({
    queryKey: ['published-news'],
    queryFn: async () => {
      console.log('Fetching news posts...');
      const { data, error } = await supabase
        .from('news_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching news posts:', error);
        throw error;
      }
      
      console.log('Fetched news posts:', data);
      return data as NewsPost[];
    },
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 // 1 minute
  });

  // Log news posts data whenever it changes
  useEffect(() => {
    if (newsPosts) {
      console.log('News posts data updated:', newsPosts);
    }
  }, [newsPosts]);

  const handleRefresh = async () => {
    try {
      await refetch();
      toast({
        title: "Refreshed",
        description: "News content has been refreshed",
      });
    } catch (err) {
      console.error('Error refreshing news:', err);
      toast({
        title: "Error",
        description: "Failed to refresh news content",
        variant: "destructive"
      });
    }
  };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
//       <section className="pt-32 pb-16 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-4xl md:text-5xl font-bold">News & Updates</h1>
//             <Button 
//               variant="outline" 
//               size="sm" 
//               onClick={handleRefresh} 
//               disabled={isLoading}
//               className="flex items-center gap-2"
//             >
//               <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
//               Refresh
//             </Button>
//           </div>
//           <p className="text-xl text-muted-foreground mb-12">
//             Stay updated with our latest news and announcements.
//           </p>
          
//           {isLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {[1, 2, 3, 4].map((i) => (
//                 <Card key={i} className="animate-pulse">
//                   <CardContent className="p-6">
//                     <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
//                     <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
//                     <div className="h-32 bg-muted rounded mb-4"></div>
//                     <div className="h-4 bg-muted rounded w-1/4"></div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           ) : error ? (
//             <div className="text-center p-8 border rounded-lg bg-red-50 text-red-500">
//               <p>There was an error loading the news. Please try again later.</p>
//               <p className="text-sm mt-2">{(error as Error).message}</p>
//             </div>
//           ) : newsPosts && newsPosts.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {newsPosts.map((post) => (
//                 <NewsPostCard key={post.id} post={post} />
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-muted-foreground p-12 border rounded-lg">
//               No news articles available at the moment. Check back soon for updates!
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

interface NewsPostCardProps {
  post: NewsPost;
}

const NewsPostCard = ({ post }: NewsPostCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      {post.image_url && (
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-2" />
          {format(new Date(post.published_at), 'MMMM d, yyyy')}
        </div>
      </CardHeader>
      <CardContent>
        {post.excerpt && (
          <p className="text-muted-foreground mb-4">{post.excerpt}</p>
        )}
        <div className="mt-4">
          <Separator className="mb-4" />
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: post.content.substring(0, 200) + (post.content.length > 200 ? '...' : '') 
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default News;
