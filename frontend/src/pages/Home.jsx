import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { Calendar, Clock, Shield, Zap, Users, TableProperties, Bell } from 'lucide-react';
import logo from '@/assets/logo.png';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Reserve your favorite table in just a few clicks',
    },
    {
      icon: Clock,
      title: 'Real-time Availability',
      description: 'See available time slots instantly',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Multiple payment options with secure transactions',
    },
    {
      icon: Zap,
      title: 'Instant Confirmation',
      description: 'Get booking confirmation immediately',
    },
  ];

  const stats = [
    { icon: Users, value: '5,000+', label: 'Active Players' },
    { icon: TableProperties, value: '120+', label: 'Premium Tables' },
    { icon: Clock, value: 'Real-time', label: 'Reservations' },
    { icon: Bell, value: 'Instant', label: 'Alerts' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50 px-4 pt-8 pb-16 md:pt-12 md:pb-24">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-[parallax_20s_ease-in-out_infinite]"
            style={{ backgroundImage: 'url(/images/billiards-hall-bg.jpg)' }}
          />
          
          {/* Cinematic Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95" />
          
          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
          
          {/* Depth of Field Blur */}
          <div className="absolute inset-0 backdrop-blur-[1px]" />
          
          {/* Light Reflections */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-info/10 rounded-full blur-[120px] animate-pulse delay-1000" />
          
          {/* Floating Pool Balls - Decorative */}
          <div className="absolute top-20 left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-md animate-[float-slow_15s_ease-in-out_infinite]" />
          <div className="absolute top-40 right-[15%] w-12 h-12 bg-info/20 rounded-full blur-md animate-[float-slow_18s_ease-in-out_infinite_reverse]" />
          <div className="absolute bottom-32 left-[20%] w-20 h-20 bg-accent/20 rounded-full blur-md animate-[float-slow_20s_ease-in-out_infinite]" />
          <div className="absolute bottom-20 right-[25%] w-14 h-14 bg-primary/20 rounded-full blur-md animate-[float-slow_16s_ease-in-out_infinite_reverse]" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* Logo */}
            <div className="mb-6 flex justify-center animate-[fade-up_0.8s_ease-out_0.2s_both]">
              <img src={logo} alt="CueReserve" className="h-64 w-auto" />
            </div>
            
            {/* Tagline with Personality */}
            <p className="mb-8 text-lg text-muted-foreground/90 sm:text-xl max-w-3xl mx-auto leading-relaxed animate-[fade-up_1s_ease-out_0.6s_both]">
              Step into excellence. Reserve premium tables, compete with the best, and experience billiards like never before.
            </p>
            
            {/* CTA Buttons with Animations */}
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row mb-12 animate-[fade-up_1s_ease-out_0.8s_both]">
              <Button 
                size="lg" 
                variant="premium" 
                onClick={() => navigate('/tables')} 
                className="w-full sm:w-auto text-lg px-10 py-6 h-auto font-semibold"
              >
                Browse Tables
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/register')} 
                className="w-full sm:w-auto text-lg px-10 py-6 h-auto font-semibold"
              >
                Sign Up Now
              </Button>
            </div>
            
            {/* Trust Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-[fade-up_1s_ease-out_1s_both]">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="relative group"
                  >
                    <div className="relative p-6 rounded-2xl bg-card/40 backdrop-blur-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(78,120,94,0.3)] hover:-translate-y-1">
                      <Icon className="h-8 w-8 text-primary mb-3 mx-auto group-hover:scale-110 transition-transform" />
                      <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 md:py-32">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl md:text-5xl font-bold text-foreground">Why Choose CueReserve?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need for a premium billiards booking experience
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-border bg-gradient-card transition-all duration-300 hover:shadow-elevated hover:scale-105 hover:border-primary/30 group">
                  <CardContent className="p-8">
                    <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors shadow-soft group-hover:shadow-[0_0_25px_rgba(78,120,94,0.4)]">
                      <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-border bg-gradient-hero px-4 py-20 md:py-28 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-4xl md:text-5xl font-bold text-foreground">Ready to Play?</h2>
            <p className="mb-10 text-xl text-muted-foreground leading-relaxed">
              Join thousands of players who trust CueReserve for their billiards bookings. Start your premium experience today.
            </p>
            <Button 
              size="lg" 
              variant="premium" 
              onClick={() => navigate('/register')}
              className="text-lg px-12 py-6 h-auto font-semibold"
            >
              Create Your Account Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-4 py-10">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 CueReserve. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
