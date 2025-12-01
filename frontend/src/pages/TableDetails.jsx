import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dummyTables } from '@/utils/dummyData';
import { Users, Coins, ArrowLeft, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const TableDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const table = dummyTables.find((t) => t.id === Number(id));

  if (!table) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Table not found</p>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to make a reservation');
      navigate('/login');
      return;
    }

    if (table.status !== 'Available') {
      toast.error('This table is not available for booking');
      return;
    }

    navigate(`/booking/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/tables')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tables
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <img
              src={table.image}
              alt={table.name}
              className="w-full rounded-lg object-cover h-96"
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold text-foreground">{table.name}</h1>
                <Badge variant={table.status === 'Available' ? 'default' : 'secondary'}>
                  {table.status}
                </Badge>
              </div>
              <Badge variant="outline" className="text-sm">{table.type}</Badge>
            </div>

            <p className="text-lg text-muted-foreground">{table.description}</p>

            <Card>
              <CardHeader>
                <CardTitle>Table Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span>Capacity</span>
                  </div>
                  <span className="font-semibold">{table.capacity} players</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-muted-foreground" />
                    <span>Hourly Rate</span>
                  </div>
                  <span className="font-semibold text-primary text-xl">₱{table.hourlyRate}/hr</span>
                </div>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full"
              onClick={handleBookNow}
              disabled={table.status !== 'Available'}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {table.status === 'Available' ? 'Book Now' : 'Not Available'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDetails;
