export type Tables = {
  blog_posts: {
    Row: {
      id: string;
      title: string;
      content: string;
      images: string[];
      created_at: string;
      updated_at: string;
      author_id: string;
    };
    Insert: {
      id?: string;
      title: string;
      content: string;
      images?: string[];
      created_at?: string;
      updated_at?: string;
      author_id: string;
    };
    Update: {
      id?: string;
      title?: string;
      content?: string;
      images?: string[];
      created_at?: string;
      updated_at?: string;
      author_id?: string;
    };
  };
};

export type Database = {
  public: {
    Tables: Tables;
  };
};
