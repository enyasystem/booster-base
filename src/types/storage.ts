export type StorageBucket = {
  id: string;
  name: string;
  owner: string | null;
  created_at: string;
  updated_at: string;
  public: boolean;
  avif_autodetection: boolean;
  file_size_limit: number | null;
  allowed_mime_types: string[] | null;
}
