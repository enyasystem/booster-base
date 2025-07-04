import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrainingPhoto {
  id: string;
  url: string;
  caption?: string;
  description?: string;
  created_at?: string;
}

export default function TrainingPhotoManagement() {
  const [photos, setPhotos] = useState<TrainingPhoto[]>([]);
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('training_photos').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setPhotos(data || []);
    setLoading(false);
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let imageUrl = url;
    try {
      if (file) {
        // Upload file to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage.from('training-photos').upload(fileName, file);
        if (uploadError) throw uploadError;
        // Get public URL
        const { data: publicUrlData } = supabase.storage.from('training-photos').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }
      if (!imageUrl) throw new Error('Please provide an image URL or upload a file.');
      const { error: insertError } = await supabase.from('training_photos').insert({ url: imageUrl, caption, description });
      if (insertError) throw insertError;
      setUrl('');
      setCaption('');
      setDescription('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchPhotos();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('An error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Training Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddPhoto} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Image File (upload)</label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="w-full border rounded px-3 py-2"
              />
              <div className="text-xs text-gray-500 mt-1">Or provide an image URL below</div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Image URL</label>
              <input type="url" value={url} onChange={e => setUrl(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Caption</label>
              <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <Button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Photo'}</Button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Current Training Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map(photo => (
              <div key={photo.id} className="border rounded-lg overflow-hidden">
                <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <div className="font-semibold">{photo.caption}</div>
                  <div className="text-sm text-gray-600">{photo.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
