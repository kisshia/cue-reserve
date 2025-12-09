import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const TableCard = ({ id, name, type, status, capacity, hourlyRate, image }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'available':
        return 'bg-[#34d399] text-white';
      case 'unavailable':
        return 'bg-[#f87171] text-white';
      default:
        return 'bg-muted';
    }
  };

  const isAvailable = status?.toLowerCase() === 'available';

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 ease-out hover:translate-y-[-8px] group rounded-2xl relative",
      "border-2 border-border/50 bg-card/50 backdrop-blur-sm",
      "shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)]",
      "hover:border-border/80",
      "after:absolute after:inset-0 after:-z-10 after:rounded-2xl after:opacity-0 after:transition-opacity after:duration-300",
      "after:bg-white/10 after:blur-2xl hover:after:opacity-100"
    )}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
        />
        <Badge className={cn('absolute right-4 top-4 shadow-md font-medium', getStatusColor(status))}>
          {status}
        </Badge>
      </div>

      <div className="h-px bg-border/30" />
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
          <Badge variant="outline" className="border-border/50 text-xs font-medium">{type}</Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground/80">
            <Users className="h-4 w-4" />
            <span>Capacity: {capacity} players</span>
          </div>
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Coins className="h-5 w-5" />
            <span>₱{hourlyRate}/hour</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button
          className={cn(
            "w-full font-semibold transition-all duration-300 ease-out",
            isAvailable 
              ? "bg-[#34d399] hover:bg-[#34d399]/90 text-white hover:shadow-[0_4px_16px_rgba(52,211,153,0.3)] hover:translate-y-[-1px]" 
              : "bg-muted/50 text-muted-foreground cursor-not-allowed"
          )}
          onClick={() => navigate(`/table/${id}`)}
          disabled={!isAvailable}
        >
          {isAvailable ? 'View Details' : 'Not Available'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TableCard;
