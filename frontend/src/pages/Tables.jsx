import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TableCard from '@/components/TableCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyState from '@/components/EmptyState';
import { Table2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TABLE_TYPES, TABLE_STATUS } from '@/utils/constants';
import { toast } from 'sonner';
import api from '@/utils/api';

const Tables = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tables, setTables] = useState([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await api.get('/tables');
      // Map database tables to frontend format with proper images
      const mappedTables = response.data.map(table => {
        const tableNum = table.table_number;
        let type = 'Standard';
        let image = '/images/standard-table.jpg';
        let hourlyRate = 150;
        let capacity = 4;

        // Assign types based on table number
        if (tableNum >= 5 && tableNum <= 8) {
          type = 'VIP';
          image = '/images/vip-table.png';
          hourlyRate = 250;
          capacity = 6;
        } else if (tableNum >= 9) {
          type = 'Premium';
          image = '/images/premium-table.png';
          hourlyRate = 350;
          capacity = 8;
        }

        return {
          id: table.id,
          name: `Table ${table.table_number}`,
          type: type,
          hourlyRate: hourlyRate,
          capacity: capacity,
          status: table.status,
          image: image,
        };
      });
      setTables(mappedTables);
    } catch (error) {
      console.error('Error fetching tables:', error);
      toast.error('Failed to load tables');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTables = tables.filter((table) => {
    const matchesType = typeFilter === 'all' || table.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || table.status === statusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: 'url(/images/tables-bg.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/60 to-background/80" />
      <div className="relative z-10">
        <Navbar />
      
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-3 text-6xl md:text-7xl font-bold text-foreground">Available Tables</h1>
          <p className="text-2xl md:text-3xl text-muted-foreground">Choose from our selection of premium billiards tables</p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48 text-lg">
              <SelectValue placeholder="Table Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-lg">All Types</SelectItem>
              {Object.values(TABLE_TYPES).map((type) => (
                <SelectItem key={type} value={type} className="text-lg">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48 text-lg">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-lg">All Status</SelectItem>
              {Object.values(TABLE_STATUS).map((status) => (
                <SelectItem key={status} value={status} className="text-lg">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tables Grid */}
        {isLoading ? (
          <LoadingSpinner size="lg" text="Loading tables..." />
        ) : filteredTables.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTables.map((table) => (
              <TableCard key={table.id} {...table} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Table2}
            title="No tables found"
            description="Try adjusting your filters or check back later"
          />
        )}
      </div>
      </div>
    </div>
  );
};

export default Tables;
