
import { Card, CardContent } from "@/components/ui/card";
import { Users, Play, Globe, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const LiveStatsSection = () => {
  const [stats, setStats] = useState({
    activeUsers: 10247,
    liveRooms: 523,
    videosWatched: 1234567,
    uptime: 99.9
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        liveRooms: Math.max(1, prev.liveRooms + Math.floor(Math.random() * 3) - 1),
        videosWatched: prev.videosWatched + Math.floor(Math.random() * 10),
        uptime: 99.9
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      label: "Users Online",
      value: stats.activeUsers.toLocaleString(),
      icon: Users,
      gradient: "from-neon-purple to-electric-blue",
      pulse: true
    },
    {
      label: "Live Rooms",
      value: stats.liveRooms.toString(),
      icon: Play,
      gradient: "from-electric-blue to-cyber-green",
      pulse: true
    },
    {
      label: "Videos Watched",
      value: stats.videosWatched.toLocaleString(),
      icon: Globe,
      gradient: "from-cyber-green to-hot-pink"
    },
    {
      label: "Uptime",
      value: `${stats.uptime}%`,
      icon: Clock,
      gradient: "from-hot-pink to-neon-purple"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold gradient-text mb-4">Live Statistics</h2>
        <p className="text-gray-300">Real-time data from our global community</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className={`cyber-card text-center group hover:scale-105 transition-all duration-500 ${stat.pulse ? 'animate-pulse-glow' : ''}`}>
            <CardContent className="pt-8">
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LiveStatsSection;
