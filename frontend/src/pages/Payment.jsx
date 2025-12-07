import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PAYMENT_METHODS } from '@/utils/constants';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/utils/api';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.CASH);
  const [bookingData, setBookingData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem('bookingData');
    if (!data) {
      toast.error('No booking data found');
      navigate('/tables');
      return;
    }
    setBookingData(JSON.parse(data));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Calculate end time based on timeSlot and duration
      const [startHour, startMinute] = bookingData.timeSlot.split(':').map(Number);
      const endHour = startHour + bookingData.duration;
      const time_end = `${String(endHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00`;

      // Create reservation in backend
      const reservationPayload = {
        date: bookingData.date,
        time_start: bookingData.timeSlot + ':00',
        time_end: time_end,
        tableId: bookingData.tableId,
      };

      const response = await api.post('/reservations', reservationPayload);

      const confirmationData = {
        ...bookingData,
        ...response.data.reservation,
        paymentMethod,
        referenceNumber: `CR-${response.data.reservation.id}`,
        status: 'Confirmed',
      };

      sessionStorage.setItem('confirmationData', JSON.stringify(confirmationData));
      sessionStorage.removeItem('bookingData');
      
      toast.success('Reservation created successfully!');
      navigate('/confirmation');
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error(error.response?.data?.error || 'Failed to create reservation');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value={PAYMENT_METHODS.CASH} id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className="font-semibold">Cash Payment</div>
                        <div className="text-sm text-muted-foreground">
                          Pay at the venue when you arrive
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value={PAYMENT_METHODS.GCASH} id="gcash" />
                      <Label htmlFor="gcash" className="flex-1 cursor-pointer">
                        <div className="font-semibold">GCash</div>
                        <div className="text-sm text-muted-foreground">
                          Pay now via GCash
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Confirm Booking'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Table</span>
                    <span className="font-medium">{bookingData.tableName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{bookingData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{bookingData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{bookingData.duration}h</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-primary">₱{bookingData.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
