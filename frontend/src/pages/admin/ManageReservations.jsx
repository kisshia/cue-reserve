import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dummyBookings } from '@/utils/dummyData';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

const ManageReservations = () => {
  const [bookings] = useState(dummyBookings);

  const handleApprove = (bookingId) => {
    toast.success('Reservation approved');
  };

  const handleCancel = (bookingId) => {
    toast.success('Reservation cancelled');
  };

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

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Manage Reservations</h1>
            <p className="text-muted-foreground">View and manage all table reservations</p>
          </div>

          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold">Reference</th>
                  <th className="text-left p-4 font-semibold">Customer</th>
                  <th className="text-left p-4 font-semibold">Table</th>
                  <th className="text-left p-4 font-semibold">Date & Time</th>
                  <th className="text-left p-4 font-semibold">Duration</th>
                  <th className="text-left p-4 font-semibold">Amount</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t">
                    <td className="p-4 font-medium">{booking.referenceNumber}</td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{booking.userName}</div>
                        <div className="text-sm text-muted-foreground">{booking.userEmail}</div>
                      </div>
                    </td>
                    <td className="p-4">{booking.tableName}</td>
                    <td className="p-4">
                      <div>
                        <div>{booking.date}</div>
                        <div className="text-sm text-muted-foreground">{booking.startTime}</div>
                      </div>
                    </td>
                    <td className="p-4">{booking.duration}h</td>
                    <td className="p-4 font-medium">₱{booking.totalAmount}</td>
                    <td className="p-4">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {booking.status === 'Pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(booking.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancel(booking.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
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

export default ManageReservations;
