
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Zap } from "lucide-react";
import { useState, useMemo } from "react";
import SearchInput from "@/components/SearchInput";
import RoomSkeleton from "@/components/skeletons/RoomSkeleton";

interface Room {
  id: string;
  name: string;
  participants: number;
  isLive: boolean;
  owner: string;
  currentVideo?: string;
}

interface RoomsSectionProps {
  rooms: Room[];
  onJoinRoom: (roomId: string) => void;
  isLoading?: boolean;
}

const RoomsSection = ({ rooms, onJoinRoom, isLoading = false }: RoomsSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = useMemo(() => {
    if (!searchQuery.trim()) return rooms;
    
    return rooms.filter(room =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.currentVideo?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [rooms, searchQuery]);

  const liveRoomsCount = rooms.filter(r => r.isLive).length;

  if (isLoading) {
    return (
      <div id="rooms-section" className="container mx-auto px-6 py-20">
        <div className="space-y-12">
          <div className="flex items-center justify-between slide-up">
            <h2 className="text-6xl font-bold gradient-text">Live Rooms</h2>
            <div className="flex items-center gap-4 glass-effect px-8 py-4 rounded-full border-2 border-cyber-green/50">
              <Zap className="h-8 w-8 text-cyber-green animate-pulse" />
              <span className="text-cyber-green font-bold text-2xl">Loading...</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <RoomSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="rooms-section" className="container mx-auto px-6 py-20">
      <div className="space-y-12">
        <div className="flex items-center justify-between slide-up">
          <h2 className="text-6xl font-bold gradient-text">Live Rooms</h2>
          <div className="flex items-center gap-4 glass-effect px-8 py-4 rounded-full border-2 border-cyber-green/50">
            <Zap className="h-8 w-8 text-cyber-green animate-pulse" />
            <span className="text-cyber-green font-bold text-2xl">{liveRoomsCount} Live</span>
          </div>
        </div>

        <div className="flex justify-center slide-up">
          <div className="w-full max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search rooms, owners, or content..."
            />
          </div>
        </div>

        {filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">
              {searchQuery ? "No rooms found matching your search." : "No rooms available."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredRooms.map((room, index) => (
              <Card key={room.id} className="cyber-card glow-effect hover:scale-110 transition-all duration-700 cursor-pointer slide-up group" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <CardTitle className="text-white text-2xl font-bold group-hover:gradient-text transition-all duration-300">{room.name}</CardTitle>
                      <CardDescription className="text-gray-300 font-semibold text-lg">
                        by {room.owner}
                      </CardDescription>
                    </div>
                    {room.isLive && (
                      <Badge className="bg-gradient-to-r from-red-500 to-hot-pink text-white font-bold px-4 py-2 animate-pulse text-lg">
                        LIVE
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3 glass-effect px-4 py-3 rounded-full border border-cyber-green/30">
                    <Users className="h-6 w-6 text-cyber-green" />
                    <span className="text-white font-semibold text-lg">{room.participants} watching</span>
                  </div>
                  
                  {room.currentVideo && (
                    <div className="text-lg text-cyber-green bg-cyber-green/20 p-4 rounded-xl font-semibold border border-cyber-green/30">
                      {room.currentVideo}
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => onJoinRoom(room.id)}
                    className="w-full bg-gradient-to-r from-electric-blue via-neon-purple to-hot-pink hover:from-electric-blue/80 hover:via-neon-purple/80 hover:to-hot-pink/80 text-white font-bold py-4 text-xl transition-all duration-500 hover:scale-105 shadow-lg"
                  >
                    Join Room
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsSection;
