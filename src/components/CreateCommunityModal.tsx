
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CreateCommunityModalProps {
  isOpen: boolean;
  communityName: string;
  communityDescription: string;
  onCommunityNameChange: (name: string) => void;
  onCommunityDescriptionChange: (description: string) => void;
  onCreateCommunity: () => void;
  onClose: () => void;
}

const CreateCommunityModal = ({ isOpen, communityName, communityDescription, onCommunityNameChange, onCommunityDescriptionChange, onCreateCommunity, onClose }: CreateCommunityModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="rainbow-border max-w-lg w-full mx-6 bounce-in">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="gradient-text text-3xl text-center">Create New Community</CardTitle>
            <CardDescription className="text-gray-300 text-xl text-center">
              Build your own community of video watchers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Input
              placeholder="Community name..."
              value={communityName}
              onChange={(e) => onCommunityNameChange(e.target.value)}
              className="bg-midnight/90 border-3 border-cyber-green/60 text-white placeholder:text-gray-400 focus:border-cyber-green text-xl py-4 rounded-xl"
            />
            <Input
              placeholder="Community description..."
              value={communityDescription}
              onChange={(e) => onCommunityDescriptionChange(e.target.value)}
              className="bg-midnight/90 border-3 border-cyber-green/60 text-white placeholder:text-gray-400 focus:border-cyber-green text-xl py-4 rounded-xl"
              onKeyPress={(e) => e.key === 'Enter' && onCreateCommunity()}
            />
            <div className="flex gap-6">
              <Button 
                onClick={onCreateCommunity}
                className="flex-1 bg-gradient-to-r from-cyber-green to-electric-blue hover:from-cyber-green/80 hover:to-electric-blue/80 text-white font-bold py-4 text-xl transition-all duration-300 rounded-xl"
              >
                Create Community
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

export default CreateCommunityModal;
