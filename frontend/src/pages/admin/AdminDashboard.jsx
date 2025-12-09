import AdminSidebar from '@/components/AdminSidebar';
import StatCard from '@/components/StatCard';
import { dummyStats } from '@/utils/dummyData';
import { Calendar, Table2, DollarSign, Users } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to CueReserve Admin Panel</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Today's Bookings"
              value={dummyStats.todayBookings}
              icon={Calendar}
              description="Active reservations today"
            />
            <StatCard
              title="Tables Unavailable"
              value={`${dummyStats.currentOccupancy}/${dummyStats.totalTables}`}
              icon={Table2}
              description="Currently unavailable tables"
            />
            <StatCard
              title="Today's Revenue"
              value={`₱${dummyStats.todayRevenue.toLocaleString()}`}
              icon={DollarSign}
              description="Total earnings today"
            />
            <StatCard
              title="Pending Checkouts"
              value={dummyStats.pendingCheckouts}
              icon={Users}
              description="Tables ready for checkout"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Revenue Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">This Week</span>
                  <span className="text-2xl font-bold text-primary">₱{dummyStats.weekRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="text-2xl font-bold text-primary">₱{dummyStats.monthRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Tables</span>
                  <span className="font-semibold">{dummyStats.totalTables}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available</span>
                  <span className="font-semibold text-green-500">
                    {dummyStats.totalTables - dummyStats.currentOccupancy}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Occupancy Rate</span>
                  <span className="font-semibold">
                    {Math.round((dummyStats.currentOccupancy / dummyStats.totalTables) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
