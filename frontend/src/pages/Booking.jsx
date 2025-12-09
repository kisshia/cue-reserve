import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { dummyTables } from '@/utils/dummyData';
import { TIME_SLOTS, DURATION_OPTIONS, ADDONS } from '@/utils/constants';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/utils/api';

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const table = dummyTables.find((t) => t.id === Number(id));
  
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState('');
  const [duration, setDuration] = useState('2');
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const toggleAddon = (addonId) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculateTotal = () => {
    const tableTotal = table.hourlyRate * Number(duration);
    const addonsTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    return tableTotal + addonsTotal;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!date || !timeSlot) {
      toast.error('Please select date and time');
      return;
    }

    setIsLoading(true);
    try {
      // Parse time slot to get start and end times
      const [startTime] = timeSlot.split(' - ');
      const [startHour] = startTime.split(':');
      const endHour = String(Number(startHour) + Number(duration)).padStart(2, '0');
      const endTime = `${endHour}:00`;

      // Format date without timezone conversion
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      // Check availability
      const response = await api.get('/reservations/check-availability', {
        params: {
          tableId: table.id,
          date: formattedDate,
          time_start: `${startTime}:00`,
          time_end: `${endTime}:00`
        }
      });

      if (!response.data.available) {
        toast.error('This table is not available for the selected date and time');
        setIsLoading(false);
        return;
      }

      // Store booking details in session storage
      const bookingData = {
        tableId: table.id,
        tableName: table.name,
        date: formattedDate,
        timeSlot,
        startTime: `${startTime}:00`,
        endTime: `${endTime}:00`,
        duration: Number(duration),
        addons: selectedAddons,
        total: calculateTotal(),
      };
      
      sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
      navigate('/payment');
    } catch (error) {
      console.error('Error checking availability:', error);
      toast.error('Failed to check table availability');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(`/table/${id}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Table Details
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Reserve {table.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>

                  {/* Time Slot */}
                  <div className="space-y-2">
                    <Label htmlFor="timeSlot">Time Slot</Label>
                    <Select value={timeSlot} onValueChange={setTimeSlot} required>
                      <SelectTrigger id="timeSlot">
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Duration */}
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Select value={duration} onValueChange={setDuration} required>
                      <SelectTrigger id="duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {DURATION_OPTIONS.map((hours) => (
                          <SelectItem key={hours} value={String(hours)}>
                            {hours} {hours === 1 ? 'hour' : 'hours'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-3">
                    <Label>Add-ons (Optional)</Label>
                    {ADDONS.map((addon) => (
                      <div key={addon.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`addon-${addon.id}`}
                          checked={selectedAddons.includes(addon.id)}
                          onCheckedChange={() => toggleAddon(addon.id)}
                        />
                        <label
                          htmlFor={`addon-${addon.id}`}
                          className="flex flex-1 cursor-pointer items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <span>{addon.name}</span>
                          <span className="text-muted-foreground">₱{addon.price}</span>
                        </label>
                      </div>
                    ))}
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? 'Checking availability...' : 'Proceed to Payment'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Table</span>
                    <span className="font-medium">{table.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{table.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium">₱{table.hourlyRate}/hr</span>
                  </div>
                  {date && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{date.toLocaleDateString()}</span>
                    </div>
                  )}
                  {timeSlot && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="font-medium">{timeSlot}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{duration}h</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">Table Fee</span>
                    <span>₱{table.hourlyRate * Number(duration)}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">Add-ons</span>
                      <span>
                        ₱
                        {selectedAddons.reduce((sum, id) => {
                          const addon = ADDONS.find((a) => a.id === id);
                          return sum + (addon?.price || 0);
                        }, 0)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">₱{calculateTotal()}</span>
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

export default Booking;
