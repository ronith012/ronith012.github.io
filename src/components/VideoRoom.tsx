import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Play, 
  Pause, 
  Volume2, 
  Users, 
  MessageCircle, 
  Send, 
  Crown,
  Settings,
  Share,
  Copy,
  CheckCheck,
  UserPlus,
  Link,
  LogOut
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Participant {
  id: string;
  name: string;
  isOwner: boolean;
  avatar?: string;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  isSystem?: boolean;
}

interface VideoRoomProps {
  roomId: string;
  roomName: string;
  isOwner?: boolean;
}

const VideoRoom = ({ roomId, roomName, isOwner = false }: VideoRoomProps) => {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "You", isOwner: isOwner },
    { id: "2", name: "Alice", isOwner: false },
    { id: "3", name: "Bob", isOwner: false },
    { id: "4", name: "Charlie", isOwner: false },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      user: "System",
      message: "Welcome to the room! Share a YouTube URL to start watching together.",
      timestamp: new Date(),
      isSystem: true
    },
    {
      id: "2", 
      user: "Alice",
      message: "Hey everyone! Ready for movie night? 🍿",
      timestamp: new Date(),
    },
    {
      id: "3",
      user: "Bob", 
      message: "Can't wait! What are we watching?",
      timestamp: new Date(),
    }
  ]);

  const [currentMessage, setCurrentMessage] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        user: "You",
        message: currentMessage,
        timestamp: new Date()
      };
      setChatMessages([...chatMessages, newMessage]);
      setCurrentMessage("");
    }
  };

  const loadVideo = () => {
    if (youtubeUrl.trim()) {
      // Extract video ID from YouTube URL
      const videoId = extractVideoId(youtubeUrl);
      if (videoId) {
        setCurrentVideo(videoId);
        const systemMessage: ChatMessage = {
          id: Date.now().toString(),
          user: "System", 
          message: `${isOwner ? "You" : "Room owner"} loaded a new video`,
          timestamp: new Date(),
          isSystem: true
        };
        setChatMessages(prev => [...prev, systemMessage]);
        setYoutubeUrl("");
        toast({
          title: "Video loaded!",
          description: "The video is now ready to play for all participants."
        });
      } else {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid YouTube URL.",
          variant: "destructive"
        });
      }
    }
  };

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      user: "System",
      message: `Video ${!isPlaying ? "played" : "paused"} by ${isOwner ? "you" : "room owner"}`,
      timestamp: new Date(),
      isSystem: true
    };
    setChatMessages(prev => [...prev, systemMessage]);
  };

  const copyRoomLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/room/${roomId}`);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      toast({
        title: "Room link copied!",
        description: "Share this link with friends to invite them."
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually.",
        variant: "destructive"
      });
    }
  };

  const inviteParticipants = () => {
    setShowInviteModal(true);
  };

  const exitRoom = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-slate via-midnight to-steel">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 slide-up">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold neon-text floating-element">{roomName}</h1>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2 glass-effect px-3 py-1 rounded-full">
                <Users className="h-4 w-4 text-cyber-green" />
                <span className="font-medium">{participants.length} participants</span>
              </div>
              <Badge className="bg-gradient-to-r from-cyber-green to-electric-blue text-white font-bold px-4 py-1 bounce-in">
                Room ID: {roomId}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={exitRoom}
              variant="outline"
              className="border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Exit Room
            </Button>
            <Button
              onClick={inviteParticipants}
              className="bg-gradient-to-r from-hot-pink to-neon-purple hover:from-hot-pink/80 hover:to-neon-purple/80 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-110 glow-effect"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Invite Friends
            </Button>
            <Button
              onClick={copyRoomLink}
              variant="outline"
              className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              {showCopied ? <CheckCheck className="h-4 w-4 mr-2" /> : <Share className="h-4 w-4 mr-2" />}
              {showCopied ? "Copied!" : "Share Room"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Video Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Controls */}
            {isOwner && (
              <div className="rainbow-border bounce-in">
                <Card className="cyber-card">
                  <CardHeader>
                    <CardTitle className="gradient-text flex items-center gap-2 text-xl">
                      <Crown className="h-6 w-6 text-yellow-400 floating-element" />
                      Room Owner Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Paste YouTube URL here..."
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="bg-midnight/80 border-2 border-neon-purple/50 text-white placeholder:text-gray-400 focus:border-neon-purple transition-all duration-300"
                        onKeyPress={(e) => e.key === 'Enter' && loadVideo()}
                      />
                      <Button 
                        onClick={loadVideo}
                        className="bg-gradient-to-r from-neon-purple via-electric-blue to-cyber-green hover:from-neon-purple/80 hover:via-electric-blue/80 hover:to-cyber-green/80 text-white font-bold px-8 transition-all duration-300 hover:scale-105 pulse-border"
                      >
                        Load Video
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Video Player */}
            <Card className="cyber-card glow-effect slide-up">
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  {currentVideo ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${currentVideo}?enablejsapi=1&origin=${window.location.origin}`}
                      className="w-full h-full rounded-t-lg"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="text-center space-y-6 p-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-neon-purple via-electric-blue to-cyber-green rounded-full flex items-center justify-center mx-auto floating-element">
                        <Play className="h-10 w-10 text-white" />
                      </div>
                      <div className="space-y-3">
                        <h3 className="gradient-text text-2xl font-bold">No video loaded</h3>
                        <p className="text-gray-300 text-lg">
                          {isOwner ? "Load a YouTube video to start watching together" : "Waiting for room owner to load a video"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Video Controls Bar */}
                <div className="p-4 bg-gradient-to-r from-midnight via-steel to-midnight border-t-2 border-neon-purple/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {isOwner && currentVideo && (
                        <Button
                          onClick={togglePlayback}
                          size="lg"
                          className="bg-gradient-to-r from-neon-purple to-electric-blue hover:from-neon-purple/80 hover:to-electric-blue/80 text-white font-bold transition-all duration-300 hover:scale-110"
                        >
                          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                        </Button>
                      )}
                      <div className="flex items-center gap-2 text-cyan-300 glass-effect px-4 py-2 rounded-full">
                        <Volume2 className="h-5 w-5" />
                        <span className="font-medium">Synchronized playback</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <Card className="cyber-card glow-effect slide-up">
              <CardHeader>
                <CardTitle className="gradient-text flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Participants ({participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-32">
                  <div className="space-y-3">
                    {participants.map((participant, index) => (
                      <div key={participant.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neon-purple/10 transition-all duration-300" style={{animationDelay: `${index * 0.1}s`}}>
                        <Avatar className="h-8 w-8 ring-2 ring-neon-purple/50">
                          <AvatarFallback className="bg-gradient-to-r from-neon-purple to-electric-blue text-white text-sm font-bold">
                            {participant.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{participant.name}</span>
                            {participant.isOwner && (
                              <Crown className="h-4 w-4 text-yellow-400 floating-element" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Chat */}
            <Card className="cyber-card glow-effect slide-up">
              <CardHeader>
                <CardTitle className="gradient-text flex items-center gap-2 text-lg">
                  <MessageCircle className="h-5 w-5" />
                  Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-80">
                  <div className="space-y-3">
                    {chatMessages.map((message) => (
                      <div key={message.id} className="space-y-1 p-2 rounded-lg hover:bg-white/5 transition-all duration-300">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${
                            message.isSystem 
                              ? "text-cyber-green" 
                              : message.user === "You" 
                                ? "text-neon-purple" 
                                : "text-electric-blue"
                          }`}>
                            {message.user}
                          </span>
                          <span className="text-xs text-gray-500">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className={`text-sm ${
                          message.isSystem ? "text-gray-400 italic" : "text-gray-200"
                        }`}>
                          {message.message}
                        </p>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>
                </ScrollArea>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    className="bg-midnight/80 border-2 border-electric-blue/50 text-white placeholder:text-gray-400 focus:border-electric-blue transition-all duration-300"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button 
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-electric-blue to-cyber-green hover:from-electric-blue/80 hover:to-cyber-green/80 text-white font-bold transition-all duration-300 hover:scale-110"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="rainbow-border max-w-lg w-full mx-4 bounce-in">
            <Card className="cyber-card">
              <CardHeader>
                <CardTitle className="gradient-text text-2xl">Invite Friends to Join</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-white font-medium">Share Room Link</label>
                  <div className="flex gap-2">
                    <Input
                      value={`${window.location.origin}/room/${roomId}`}
                      readOnly
                      className="bg-midnight/80 border-2 border-neon-purple/50 text-white"
                    />
                    <Button
                      onClick={copyRoomLink}
                      className="bg-gradient-to-r from-neon-purple to-electric-blue hover:from-neon-purple/80 hover:to-electric-blue/80 text-white font-bold transition-all duration-300 hover:scale-105"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 bg-gradient-to-r from-cyber-green to-electric-blue hover:from-cyber-green/80 hover:to-electric-blue/80 text-white font-bold transition-all duration-300"
                  >
                    Done
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoRoom;
