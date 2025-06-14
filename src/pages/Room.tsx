
import { useParams } from "react-router-dom";
import VideoRoom from "@/components/VideoRoom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Room = () => {
  const { roomId } = useParams();
  
  if (!roomId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-slate via-midnight to-steel flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Room not found</h1>
          <p className="text-gray-400">The room you're looking for doesn't exist.</p>
          <Button 
            onClick={() => window.location.href = "/"}
            className="bg-gradient-to-r from-neon-purple to-electric-blue hover:from-neon-purple/80 hover:to-electric-blue/80 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Mock room data - in a real app this would come from a database
  const roomName = `Room ${roomId}`;
  const isOwner = roomId === "1"; // Mock: user is owner of room 1

  return <VideoRoom roomId={roomId} roomName={roomName} isOwner={isOwner} />;
};

export default Room;
