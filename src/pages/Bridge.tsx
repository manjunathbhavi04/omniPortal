import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, HelpCircle, Send, RefreshCw, CheckCircle } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import ConnectWalletButton from '../components/ConnectWalletButton';
import ChainSelector from '../components/ChainSelector';
import TokenSelector from '../components/TokenSelector';
import { supportedChains, gasEstimates } from '../data/mockData';
import { Chain, Token } from '../types';
import toast from 'react-hot-toast';

const Bridge = () => {
  const { wallet } = useWallet();
  const [sourceChain, setSourceChain] = useState<Chain | null>(null);
  const [destinationChain, setDestinationChain] = useState<Chain | null>(null);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState('');
  const [isFetchingFees, setIsFetchingFees] = useState(false);
  const [estimatedFees, setEstimatedFees] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set source chain based on wallet connection
  useEffect(() => {
    if (wallet.isConnected) {
      const chain = wallet.provider === 'phantom' 
        ? supportedChains.find(c => c.id === 'solana') 
        : supportedChains.find(c => c.id === 'ethereum');
      
      if (chain) {
        setSourceChain(chain);
      }
    } else {
      setSourceChain(null);
      setDestinationChain(null);
      setSelectedToken(null);
      setAmount('');
    }
  }, [wallet.isConnected, wallet.provider]);

  const handleChainSwap = () => {
    if (sourceChain && destinationChain) {
      setSourceChain(destinationChain);
      setDestinationChain(sourceChain);
      // Reset token when swapping chains
      setSelectedToken(null);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      if (value && parseFloat(value) > 0 && sourceChain && destinationChain) {
        estimateFees();
      } else {
        setEstimatedFees(null);
      }
    }
  };

  const estimateFees = () => {
    if (!sourceChain || !destinationChain) return;
    
    setIsFetchingFees(true);
    
    // Simulate API call
    setTimeout(() => {
      setEstimatedFees(gasEstimates[sourceChain.id as keyof typeof gasEstimates]);
      setIsFetchingFees(false);
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sourceChain || !destinationChain || !selectedToken || !amount) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.custom((t) => (
        <div className={`${t.visible ? 'animate-slideIn' : 'animate-slideOut'} max-w-md w-full glass-card pointer-events-auto flex items-start`}>
          <div className="flex-1 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <CheckCircle className="h-5 w-5 text-success-500" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">
                  Bridge Initiated
                </p>
                <p className="mt-1 text-sm text-white/70">
                  {amount} {selectedToken.symbol} is being bridged from {sourceChain.name} to {destinationChain.name}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex border-l border-white/10 p-4"
          >
            <span className="sr-only">Dismiss</span>
            <X size={18} className="text-white/60 hover:text-white" />
          </button>
        </div>
      ));
      
      // Reset form after successful submission
      setAmount('');
      setDestinationChain(null);
      setSelectedToken(null);
      setEstimatedFees(null);
    } catch (error) {
      toast.error('Failed to bridge tokens. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If wallet is not connected, show connect wallet screen
  if (!wallet.isConnected) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center glass-card">
          <ArrowRightLeft className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-white/70 mb-8">
            Please connect your wallet to bridge assets across chains.
          </p>
          <ConnectWalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Bridge Assets</h1>
          <p className="text-white/70">
            Transfer tokens and NFTs across different blockchains securely
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="card"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
                <div className="md:col-span-3">
                  <ChainSelector
                    selectedChain={sourceChain}
                    onSelectChain={setSourceChain}
                    label="Source Chain"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="md:col-span-2 flex items-end justify-center">
                  <button 
                    type="button"
                    onClick={handleChainSwap}
                    disabled={!sourceChain || !destinationChain || isSubmitting}
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-background-dark border border-white/10 
                      ${(!sourceChain || !destinationChain || isSubmitting) 
                        ? 'opacity-50 cursor-not-allowed' 
                        : 'hover:bg-white/5 hover:border-white/30'}`}
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="md:col-span-3">
                  <ChainSelector
                    selectedChain={destinationChain}
                    onSelectChain={setDestinationChain}
                    label="Destination Chain"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/80 mb-1.5">
                Token to Bridge
              </label>
              <TokenSelector
                selectedToken={selectedToken}
                onSelectToken={setSelectedToken}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="amount" className="block text-sm font-medium text-white/80 mb-1.5">
                Amount
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  disabled={isSubmitting}
                  className="input pr-20"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <span className="text-white/60">
                    {selectedToken ? selectedToken.symbol : 'Token'}
                  </span>
                </div>
              </div>
            </div>
            
            {sourceChain && destinationChain && amount && parseFloat(amount) > 0 && (
              <div className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/70 flex items-center">
                    Estimated Gas Fee
                    <HelpCircle className="h-3.5 w-3.5 ml-1 text-white/40" />
                  </span>
                  {isFetchingFees ? (
                    <div className="flex items-center">
                      <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                      <span className="text-sm">Calculating...</span>
                    </div>
                  ) : (
                    <span className="font-medium">{estimatedFees || '--'}</span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/70">Estimated Time</span>
                  <span className="font-medium">~2-5 minutes</span>
                </div>
              </div>
            )}
            
            <button
              type="submit"
              disabled={!sourceChain || !destinationChain || !selectedToken || !amount || isSubmitting || parseFloat(amount) <= 0}
              className={`btn-accent w-full py-3 flex items-center justify-center space-x-2 ${
                (!sourceChain || !destinationChain || !selectedToken || !amount || isSubmitting || parseFloat(amount) <= 0)
                  ? 'opacity-60 cursor-not-allowed'
                  : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Bridge Now</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-8 glass-card"
        >
          <h3 className="text-lg font-semibold mb-4">Important Information</h3>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 rounded-full bg-white/10 text-white flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">
                1
              </span>
              <span>
                Bridging typically takes 2-5 minutes to complete depending on network congestion.
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 rounded-full bg-white/10 text-white flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">
                2
              </span>
              <span>
                You'll need to approve the transaction in your wallet once you click "Bridge Now".
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-5 h-5 rounded-full bg-white/10 text-white flex-shrink-0 flex items-center justify-center text-xs mr-2 mt-0.5">
                3
              </span>
              <span>
                LayerZero ensures secure cross-chain transactions with fast finality.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Bridge;