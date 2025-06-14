
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CreateRoomModalProps {
  isOpen: boolean;
  roomName: string;
  onRoomNameChange: (name: string) => void;
  onCreateRoom: () => void;
  onClose: () => void;
}

const CreateRoomModal = ({ isOpen, roomName, onRoomNameChange, onCreateRoom, onClose }: CreateRoomModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="rainbow-border max-w-lg w-full mx-6 bounce-in">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="gradient-text text-3xl text-center">Create New Room</CardTitle>
            <CardDescription className="text-gray-300 text-xl text-center">
              Start your synchronized viewing experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <Input
              placeholder="Enter room name..."
              value={roomName}
              onChange={(e) => onRoomNameChange(e.target.value)}
              className="bg-midnight/90 border-3 border-neon-purple/60 text-white placeholder:text-gray-400 focus:border-neon-purple text-xl py-4 rounded-xl"
              onKeyPress={(e) => e.key === 'Enter' && onCreateRoom()}
            />
            <div className="flex gap-6">
              <Button 
                onClick={onCreateRoom}
                className="flex-1 bg-gradient-to-r from-neon-purple to-electric-blue hover:from-neon-purple/80 hover:to-electric-blue/80 text-white font-bold py-4 text-xl transition-all duration-300 rounded-xl"
              >
                Create Room
              </Button>
              <Button 
                onClick={onClose}
                variant="outline"
                className="border-3 border-gray-500 text-gray-300 hover:bg-gray-700 font-bold px-8 py-4 text-xl rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateRoomModal;
