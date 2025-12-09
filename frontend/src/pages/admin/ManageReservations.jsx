import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import api from '@/utils/api';
import { RefreshCw } from 'lucide-react';

const ManageReservations = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReservations();
    
    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchReservations();
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/reservations');
      
      // Transform API data to match table format
      const transformedBookings = response.data.map((reservation) => {
        // Parse date without timezone conversion
        const [year, month, day] = reservation.date.split('-');
        const dateObj = new Date(year, parseInt(month) - 1, parseInt(day));
        
        return {
          id: reservation.id,
          referenceNumber: `RES-${reservation.id.toString().padStart(6, '0')}`,
          userName: reservation.User?.name || 'Unknown User',
          userEmail: reservation.User?.email || 'N/A',
          tableName: `Table ${reservation.Table?.table_number || 'N/A'}`,
          date: dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          startTime: reservation.time_start,
          endTime: reservation.time_end,
          duration: calculateDuration(reservation.time_start, reservation.time_end),
          totalAmount: calculateAmount(reservation.time_start, reservation.time_end),
          status: reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1),
          reservationStatus: reservation.status,
        };
      });
      
      setBookings(transformedBookings);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast.error('Failed to load reservations');
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = (timeStart, timeEnd) => {
    const [startH, startM] = timeStart.split(':');
    const [endH, endM] = timeEnd.split(':');
    const start = parseInt(startH) + parseInt(startM) / 60;
    const end = parseInt(endH) + parseInt(endM) / 60;
    return Math.round((end - start) * 10) / 10;
  };

  const calculateAmount = (timeStart, timeEnd) => {
    const duration = calculateDuration(timeStart, timeEnd);
    return Math.round(duration * 150); // 150 per hour average
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchReservations();
    setRefreshing(false);
    toast.success('Reservations refreshed');
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
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Manage Reservations</h1>
                <p className="text-muted-foreground">View and manage all table reservations</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Loading reservations...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">No reservations found</p>
            </div>
          ) : (
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
                    <tr key={booking.id} className="border-t hover:bg-muted/50">
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
                        <span className="text-sm text-muted-foreground">No actions available</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageReservations;
