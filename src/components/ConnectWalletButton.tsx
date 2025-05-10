import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { Wallet, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ConnectWalletButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { connectWallet, isConnecting } = useWallet();

  const handleConnect = async (provider: 'phantom' | 'metamask') => {
    await connectWallet(provider);
    setModalOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setModalOpen(true)} 
        className="btn-primary"
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </button>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 bg-background-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="glass-card max-w-md w-full relative"
            >
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-xl font-semibold mb-4">Connect Your Wallet</h3>
              <p className="text-white/70 mb-6">
                Connect your wallet to access the Omnichain Portal and bridge assets across networks.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleConnect('phantom')}
                  disabled={isConnecting}
                  className="w-full py-3 px-4 border border-white/20 rounded-lg hover:bg-white/5 transition flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img 
                      src="https://phantom.app/img/logo.png" 
                      alt="Phantom" 
                      className="w-6 h-6 mr-3" 
                    />
                    <span className="font-medium">Phantom</span>
                  </div>
                  {isConnecting ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary-400" />
                  ) : (
                    <span className="text-sm text-white/60">Solana</span>
                  )}
                </button>
                
                <button
                  onClick={() => handleConnect('metamask')}
                  disabled={isConnecting}
                  className="w-full py-3 px-4 border border-white/20 rounded-lg hover:bg-white/5 transition flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                      alt="MetaMask" 
                      className="w-6 h-6 mr-3" 
                    />
                    <span className="font-medium">MetaMask</span>
                  </div>
                  {isConnecting ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary-400" />
                  ) : (
                    <span className="text-sm text-white/60">Ethereum & EVM</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConnectWalletButton;