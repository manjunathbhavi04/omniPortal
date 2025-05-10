import { motion } from 'framer-motion';
import { ArrowRight, Layers, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConnectWalletButton from '../components/ConnectWalletButton';
import { useWallet } from '../context/WalletContext';

const Home = () => {
  const { wallet } = useWallet();

  const features = [
    {
      icon: <Globe className="h-8 w-8 text-primary-400" />,
      title: 'Cross-Chain Connectivity',
      description: 'Bridge tokens and NFTs across multiple blockchains with ease using LayerZero V2 protocol.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary-400" />,
      title: 'Secure Transactions',
      description: 'Enterprise-grade security ensuring your assets remain safe during cross-chain transfers.',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary-400" />,
      title: 'Lightning Fast',
      description: 'Experience minimal latency with optimized bridging protocols and direct chain communication.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-secondary-500/20 rounded-full blur-[80px] -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-6">
                Powered by LayerZero V2
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Seamless</span> Omnichain Experience for Solana Users
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Bridge tokens, NFTs and messages across multiple blockchains with a unified, 
                user-friendly interface. Connect once, access everywhere.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                {wallet.isConnected ? (
                  <Link to="/bridge" className="btn-accent py-3 px-5 text-lg font-semibold">
                    Bridge Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <ConnectWalletButton />
                )}
                
                <Link to="/dashboard" className="btn-outline py-3 px-5">
                  View Dashboard
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-16"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent z-10 pointer-events-none"></div>
                <img 
                  src="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg" 
                  alt="OmniPortal Dashboard Preview" 
                  className="w-full h-auto rounded-xl shadow-2xl border border-white/10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute -bottom-40 left-20 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Future of Cross-Chain Operations
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Experience the next generation of blockchain interoperability with our 
              advanced omnichain portal.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="glass-card flex flex-col items-center text-center"
              >
                <div className="bg-white/5 rounded-full p-4 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto glass-card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">Ready to go cross-chain?</h2>
                <p className="text-white/70 mb-6">
                  Connect your wallet now and experience the future of omnichain 
                  operations with seamless bridging between networks.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <Link to="/bridge" className="btn-accent">
                    Start Bridging
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link to="/about" className="btn-outline">
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 bg-gradient-to-br from-primary-600 to-secondary-600 p-8 md:p-12 flex items-center justify-center">
                <Layers className="h-32 w-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;