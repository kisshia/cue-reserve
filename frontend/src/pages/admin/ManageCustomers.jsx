import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { dummyUsers } from '@/utils/dummyData';
import { Mail, Phone, Eye } from 'lucide-react';

const ManageCustomers = () => {
  const [customers] = useState(dummyUsers);

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Manage Customers</h1>
            <p className="text-muted-foreground">View and manage customer accounts</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {customers.map((customer) => (
              <div key={customer.id} className="bg-card border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
                <h3 className="text-lg font-semibold mb-2">{customer.name}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {customer.email}
                  </div>
                  {customer.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {customer.phone}
                    </div>
                  )}
                  <div className="pt-2 border-t">
                    <span className="text-xs">Member since {customer.joinedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomers;
