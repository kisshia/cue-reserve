import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { dummyBookings } from '@/utils/dummyData';
import { useAuth } from '@/context/AuthContext';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { toast } from 'sonner';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings] = useState(dummyBookings.filter((b) => b.userId === user?.id));

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-500';
      case 'Pending':
        return 'bg-yellow-500';
      case 'Completed':
        return 'bg-blue-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleCancelBooking = (bookingId) => {
    toast.success('Booking cancelled successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your table reservations</p>
        </div>

        {bookings.length === 0 ? (
          <EmptyState
            icon={Calendar}
            title="No bookings yet"
            description="You haven't made any reservations. Book a table to get started!"
          />
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{booking.tableName}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ref: {booking.referenceNumber}
                      </p>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Date</div>
                        <div className="font-medium">{booking.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Time</div>
                        <div className="font-medium">{booking.startTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                        <div className="font-medium">{booking.duration}h</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-xs text-muted-foreground">Total</div>
                        <div className="font-medium text-primary">₱{booking.totalAmount}</div>
                      </div>
                    </div>
                  </div>
                  {booking.status === 'Pending' && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
