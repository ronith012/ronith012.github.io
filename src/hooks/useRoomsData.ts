
import { useState, useEffect } from "react";

export interface Room {
  id: string;
  name: string;
  participants: number;
  isLive: boolean;
  owner: string;
  currentVideo?: string;
}

export const useRoomsData = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const loadRooms = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRooms([
        {
          id: "1",
          name: "Movie Night 🎬",
          participants: 12,
          isLive: true,
          owner: "CinemaLover",
          currentVideo: "Watching: The Matrix Trailer"
        },
        {
          id: "2", 
          name: "Music Videos Central 🎵",
          participants: 8,
          isLive: true,
          owner: "BeatMaster",
          currentVideo: "Playing: Top Hits Playlist"
        },
        {
          id: "3",
          name: "Tech Talks & Reviews 💻",
          participants: 15,
          isLive: false,
          owner: "TechGuru",
        },
        {
          id:  "4",
          name: "Gaming Streams 🎮",
          participants: 23,
          isLive: true,
          owner: "ProGamer",
          currentVideo: "Live: Cyberpunk 2077 Gameplay"
        }
      ]);
      
      setIsLoading(false);
    };

    loadRooms();
  }, []);

  const joinRoom = (roomId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId 
        ? { ...room, participants: room.participants + 1 }
        : room
    ));
  };

  const createRoom = (newRoomName: string) => {
    if (newRoomName.trim()) {
      const newRoom: Room = {
        id: Date.now().toString(),
        name: newRoomName,
        participants: 1,
        isLive: false,
        owner: "You"
      };
      setRooms([...rooms, newRoom]);
      return newRoom;
    }
    return null;
  };

  return { rooms, joinRoom, createRoom, isLoading };
};
