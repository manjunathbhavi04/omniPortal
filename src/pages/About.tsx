import { motion } from 'framer-motion';
import { 
  Layers, Shield, Zap, Globe, ArrowRight, 
  CheckCircle, BarChart4, NetworkIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary-400" />,
      title: 'Security-First Design',
      description: 'Built with enterprise-grade security to ensure your assets remain protected during cross-chain transfers.',
    },
    {
      icon: <Zap className="h-10 w-10 text-primary-400" />,
      title: 'Ultra-Fast Transfers',
      description: 'Experience minimal latency with optimized bridging protocols and direct chain communication.',
    },
    {
      icon: <NetworkIcon className="h-10 w-10 text-primary-400" />,
      title: 'Multi-Chain Support',
      description: 'Bridge assets across all major blockchain networks including Solana, Ethereum, and more.',
    },
    {
      icon: <BarChart4 className="h-10 w-10 text-primary-400" />,
      title: 'Transparent Fee Structure',
      description: 'Clear and upfront gas estimation with no hidden costs or transaction surprises.',
    },
  ];

  const techFeatures = [
    'Native Solana integration for seamless wallet connection',
    'Powered by LayerZero V2 for secure cross-chain messaging',
    'Fully audited smart contracts for maximum security',
    'User-friendly interface designed for beginners and experts alike',
    'Real-time transaction status updates',
    'Comprehensive support for tokens and NFTs',
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16">
        <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[100px] -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                About <span className="gradient-text">OmniPortal</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8">
                We're building the next generation of cross-chain infrastructure, enabling seamless 
                asset transfers across multiple blockchains with a focus on security and user experience.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-card mb-16"
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-6 md:p-8">
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-white/80 mb-4">
                    At OmniPortal, we believe blockchain technology should be accessible to everyone, 
                    regardless of which network they prefer. Our mission is to create a world where 
                    blockchain boundaries disappear, allowing for true interoperability across all 
                    major networks.
                  </p>
                  <p className="text-white/80">
                    We're leveraging LayerZero V2 technology to build cross-chain infrastructure 
                    that's secure, fast, and user-friendly. Whether you're a developer, investor, 
                    or casual user, OmniPortal provides the tools needed to seamlessly interact with 
                    multiple blockchains from one unified interface.
                  </p>
                </div>
                
                <div className="md:w-1/2 flex justify-center p-6 md:p-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-[30px]"></div>
                    <Layers className="relative z-10 w-48 h-48 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* LayerZero Technology */}
      <section className="py-20 relative">
        <div className="absolute -left-40 bottom-20 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[80px] -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Powered by <span className="gradient-text">LayerZero V2</span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                LayerZero is the leading omnichain interoperability protocol, enabling cross-chain 
                messaging with unmatched security and reliability.
              </p>
            </div>
            
            <div className="glass-card mb-12">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 bg-gradient-to-br from-accent-500/20 to-accent-700/20 p-8 flex items-center justify-center">
                  <Globe className="h-32 w-32 text-accent-400" />
                </div>
                
                <div className="md:w-3/5 p-8">
                  <h3 className="text-xl font-semibold mb-4">How LayerZero Works</h3>
                  <p className="text-white/80 mb-4">
                    LayerZero V2 allows for secure, direct communication between different blockchains 
                    without requiring users to trust intermediaries. The protocol uses a unique architecture 
                    that separates message validation from message delivery, ensuring maximum security 
                    and minimal latency.
                  </p>
                  
                  <h4 className="font-semibold mt-6 mb-2">Key Technical Features:</h4>
                  <ul className="space-y-2">
                    {techFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Features */}
      <section className="py-20 relative">
        <div className="absolute -right-40 top-20 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[80px] -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Key Features
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Our platform combines cutting-edge technology with intuitive design
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                  className="glass-card"
                >
                  <div className="p-2 rounded-full bg-white/5 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to experience seamless cross-chain operations?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Join thousands of users already leveraging OmniPortal for their cross-chain needs.
                Connect your wallet today and bridge tokens across chains in minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/bridge" className="btn-accent py-3 px-6">
                  Start Bridging
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/contact" className="btn-outline py-3 px-6">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;