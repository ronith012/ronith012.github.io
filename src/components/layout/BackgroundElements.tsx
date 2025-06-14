
const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-neon-purple/20 rounded-full blur-3xl gradient-shift"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-electric-blue/20 rounded-full blur-3xl gradient-shift" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyber-green/20 rounded-full blur-3xl gradient-shift" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-40 right-10 w-64 h-64 bg-hot-pink/20 rounded-full blur-3xl gradient-shift" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-neon-purple/10 rounded-full blur-2xl floating-element"></div>
    </div>
  );
};

export default BackgroundElements;
