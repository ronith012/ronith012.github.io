
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navigation from "@/components/Navigation";
import CreateRoomModal from "@/components/CreateRoomModal";
import CreateCommunityModal from "@/components/CreateCommunityModal";
import FeedbackButton from "@/components/FeedbackButton";
import BackgroundElements from "@/components/layout/BackgroundElements";
import PageSections from "@/components/layout/PageSections";
import { useRoomsData } from "@/hooks/useRoomsData";
import { useCommunitiesData } from "@/hooks/useCommunitiesData";

const Index = () => {
  const navigate = useNavigate();
  
  const { rooms, joinRoom, createRoom, isLoading: isRoomsLoading } = useRoomsData();
  const { communities, createCommunity } = useCommunitiesData();

  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newCommunityName, setNewCommunityName] = useState("");
  const [newCommunityDescription, setNewCommunityDescription] = useState("");

  const handleCreateRoom = () => {
    const newRoom = createRoom(newRoomName);
    if (newRoom) {
      setNewRoomName("");
      setShowCreateRoom(false);
      navigate(`/room/${newRoom.id}`);
    }
  };

  const handleCreateCommunity = () => {
    const newCommunity = createCommunity(newCommunityName, newCommunityDescription);
    if (newCommunity) {
      setNewCommunityName("");
      setNewCommunityDescription("");
      setShowCreateCommunity(false);
    }
  };

  const handleJoinRoom = (roomId: string) => {
    joinRoom(roomId);
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen overflow-hidden dark:bg-gradient-to-br dark:from-dark-slate dark:via-midnight dark:to-steel light:bg-gradient-to-br light:from-gray-50 light:via-white light:to-gray-100">
      <BackgroundElements />

      <Navigation onCreateRoom={() => setShowCreateRoom(true)} />
      
      <PageSections 
        onCreateRoom={() => setShowCreateRoom(true)}
        onCreateCommunity={() => setShowCreateCommunity(true)}
        rooms={rooms}
        communities={communities}
        onJoinRoom={handleJoinRoom}
        isRoomsLoading={isRoomsLoading}
      />

      <CreateRoomModal
        isOpen={showCreateRoom}
        roomName={newRoomName}
        onRoomNameChange={setNewRoomName}
        onCreateRoom={handleCreateRoom}
        onClose={() => setShowCreateRoom(false)}
      />

      <CreateCommunityModal
        isOpen={showCreateCommunity}
        communityName={newCommunityName}
        communityDescription={newCommunityDescription}
        onCommunityNameChange={setNewCommunityName}
        onCommunityDescriptionChange={setNewCommunityDescription}
        onCreateCommunity={handleCreateCommunity}
        onClose={() => setShowCreateCommunity(false)}
      />

      <FeedbackButton />
    </div>
  );
};

export default Index;
