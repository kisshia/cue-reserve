import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dummyTables } from '@/utils/dummyData';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const ManageTables = () => {
  const [tables] = useState(dummyTables);

  const handleEdit = (tableId) => {
    toast.info(`Edit table ${tableId}`);
  };

  const handleDelete = (tableId) => {
    toast.success(`Table ${tableId} deleted`);
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Manage Tables</h1>
              <p className="text-muted-foreground">Add, edit, or remove billiards tables</p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Table
            </Button>
          </div>

          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold">Table Name</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Capacity</th>
                  <th className="text-left p-4 font-semibold">Hourly Rate</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tables.map((table) => (
                  <tr key={table.id} className="border-t">
                    <td className="p-4 font-medium">{table.name}</td>
                    <td className="p-4">{table.type}</td>
                    <td className="p-4">
                      <Badge variant={table.status === 'Available' ? 'default' : 'secondary'}>
                        {table.status}
                      </Badge>
                    </td>
                    <td className="p-4">{table.capacity} players</td>
                    <td className="p-4">₱{table.hourlyRate}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(table.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(table.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTables;
