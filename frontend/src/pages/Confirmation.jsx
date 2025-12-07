import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const Confirmation = () => {
  const navigate = useNavigate();
  const [confirmationData, setConfirmationData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('confirmationData');
    if (!data) {
      navigate('/tables');
      return;
    }
    setConfirmationData(JSON.parse(data));
  }, [navigate]);

  if (!confirmationData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="h-20 w-20 text-green-500" />
              </div>
              <CardTitle className="text-3xl">Booking Confirmed!</CardTitle>
              <p className="text-muted-foreground">
                Your reservation has been successfully confirmed
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-6 rounded-lg space-y-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Reference Number</div>
                  <div className="text-2xl font-bold text-primary">{confirmationData.referenceNumber}</div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Booking Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Table</span>
                    <span className="font-medium">{confirmationData.tableName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{confirmationData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{confirmationData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{confirmationData.duration} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium">{confirmationData.paymentMethod}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₱{confirmationData.total}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={() => navigate('/my-bookings')} className="flex-1">
                  View My Bookings
                </Button>
                <Button variant="outline" onClick={() => navigate('/tables')} className="flex-1">
                  Book Another Table
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
