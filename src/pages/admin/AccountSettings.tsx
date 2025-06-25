
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PasswordChangeForm from '@/components/auth/PasswordChangeForm';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useAuth } from '@/hooks/useAuth';

const AccountSettings = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and change your password
        </p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p>{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account ID</p>
              <p className="text-sm font-mono">{user?.id}</p>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            
            <TabsContent value="password">
              <PasswordChangeForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
