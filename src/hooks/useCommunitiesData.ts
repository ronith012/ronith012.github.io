
import { useState } from "react";
import { Video, Music, Gamepad2, Coffee, Heart } from "lucide-react";

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  icon: any;
  color: string;
  category: string;
}

export const useCommunitiesData = () => {
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: "1",
      name: "Movie Buffs",
      description: "For cinema enthusiasts and film lovers",
      members: 1247,
      icon: Video,
      color: "from-purple-500 to-pink-500",
      category: "Entertainment"
    },
    {
      id: "2",
      name: "Music Lovers",
      description: "Share and discover amazing music videos",
      members: 892,
      icon: Music,
      color: "from-green-500 to-blue-500",
      category: "Music"
    },
    {
      id: "3",
      name: "Gamers Unite",
      description: "Watch gaming content and streams together",
      members: 2156,
      icon: Gamepad2,
      color: "from-red-500 to-orange-500",
      category: "Gaming"
    },
    {
      id: "4",
      name: "Study Together",
      description: "Educational content and study sessions",
      members: 634,
      icon: Coffee,
      color: "from-indigo-500 to-cyan-500",
      category: "Education"
    }
  ]);

  const createCommunity = (name: string, description: string) => {
    if (name.trim() && description.trim()) {
      const newCommunity: Community = {
        id: Date.now().toString(),
        name,
        description,
        members: 1,
        icon: Heart,
        color: "from-pink-500 to-rose-500",
        category: "Custom"
      };
      setCommunities([...communities, newCommunity]);
      return newCommunity;
    }
    return null;
  };

  return { communities, createCommunity };
};
