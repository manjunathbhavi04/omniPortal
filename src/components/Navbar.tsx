import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { 
  Wallet, ChevronRight, Menu, X, ExternalLink, 
  LogOut, Layers, Activity, Home, Info, SendHorizontal, 
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import ConnectWalletButton from './ConnectWalletButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wallet, disconnectWallet } = useWallet();
  const location = useLocation();

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <Activity size={18} /> },
    { name: 'Bridge', path: '/bridge', icon: <SendHorizontal size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare size={18} /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background-dark/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white hover:text-white"
          >
            <Layers className="h-8 w-8 text-accent-500" />
            <span className="font-bold text-xl">OmniPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg flex items-center space-x-1.5 transition duration-200 ${
                  isActive(link.path)
                    ? 'text-white bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Wallet Connection Button */}
          <div className="hidden md:block">
            {wallet.isConnected ? (
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="h-2 w-2 rounded-full bg-success-500 animate-pulse"></div>
                  <span className="text-sm font-medium truncate max-w-[120px]">{wallet.address}</span>
                </motion.div>
                <button 
                  onClick={disconnectWallet}
                  className="btn-outline !p-2"
                  title="Disconnect wallet"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <ConnectWalletButton />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-background-dark border-t border-white/5 py-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg flex items-center justify-between ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {link.icon}
                    <span>{link.name}</span>
                  </div>
                  <ChevronRight size={16} />
                </Link>
              ))}
              
              {/* Mobile Wallet Button */}
              {wallet.isConnected ? (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Wallet size={18} className="text-primary-400" />
                      <span className="text-sm font-medium truncate max-w-[180px]">
                        {wallet.address}
                      </span>
                    </div>
                    <button 
                      onClick={disconnectWallet}
                      className="text-error-400 hover:text-error-300"
                    >
                      <LogOut size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-white/10 px-4">
                  <ConnectWalletButton />
                </div>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;