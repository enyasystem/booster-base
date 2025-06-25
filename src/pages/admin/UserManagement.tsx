import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';

interface User {
  id: string;
  email?: string;
  full_name?: string;
  username?: string;
}

export default function UserManagement() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('profiles').select('id, email, full_name, username');
      if (error) setError(error.message);
      else setUsers(data || []);
      setLoading(false);
    };
    fetchUsers();
  }, [isAdmin]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (!error) setUsers(users.filter(u => u.id !== id));
    else setError(error.message);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.checked ? users.map(u => u.id) : []);
  };

  const handleSelect = (id: string) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selected.length} selected user(s)?`)) return;
    const { error } = await supabase.from('profiles').delete().in('id', selected);
    if (!error) {
      setUsers(users.filter(u => !selected.includes(u.id)));
      setSelected([]);
    } else setError(error.message);
  };

  if (!isAdmin) return <div className="p-8 text-center text-red-500">Access denied.</div>;
  if (loading) return <div className="p-8 text-center">Loading users...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Registered Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.length === users.length && users.length > 0}
              onChange={handleSelectAll}
              className="mr-2"
            />
            <span>Select All</span>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              disabled={selected.length === 0}
            >
              Delete Selected
            </Button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selected.length === users.length && users.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Full Name</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selected.includes(u.id)}
                      onChange={() => handleSelect(u.id)}
                    />
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">{u.id}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.full_name}</td>
                  <td className="px-4 py-2">{u.username}</td>
                  <td className="px-4 py-2">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(u.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
