
import { Github, Twitter, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t-3 border-neon-purple/40 mt-20 bg-midnight/50">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-hot-pink via-neon-purple to-electric-blue text-3xl font-bold">
              StreamSync
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Bringing people together through synchronized video experiences. 
              Watch, chat, and connect with friends worldwide.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-purple to-electric-blue rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300">
                <Github className="h-6 w-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-electric-blue to-cyber-green rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300">
                <Twitter className="h-6 w-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-cyber-green to-hot-pink rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300">
                <Mail className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Features</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Perfect Sync</li>
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Live Chat</li>
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Unlimited Rooms</li>
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Community Building</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Support</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Bug Reports</li>
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Feature Requests</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white">Company</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-electric-blue cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-electric-blue cursor-pointer transition-colors">Careers</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neon-purple/30 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-300 text-lg">
              © 2024 StreamSync. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-gray-300">
              <span>Made with</span>
              <Heart className="h-5 w-5 text-hot-pink" />
              <span>for the streaming community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
