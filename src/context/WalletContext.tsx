import { createContext, useState, useContext, ReactNode } from 'react';
import { WalletInfo } from '../types';

type WalletContextType = {
  wallet: WalletInfo;
  connectWallet: (provider: 'phantom' | 'metamask') => Promise<void>;
  disconnectWallet: () => void;
  isConnecting: boolean;
};

const defaultWallet: WalletInfo = {
  isConnected: false,
  address: '',
  balance: '0',
  provider: null,
};

const WalletContext = createContext<WalletContextType>({
  wallet: defaultWallet,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallet, setWallet] = useState<WalletInfo>(defaultWallet);
  const [isConnecting, setIsConnecting] = useState(false);

  // Mock wallet connection for demo purposes
  const connectWallet = async (provider: 'phantom' | 'metamask') => {
    setIsConnecting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockAddress = provider === 'phantom' 
        ? '8xrt45PGH...7Uxz2' 
        : '0x1a2b...3c4d';
        
      setWallet({
        isConnected: true,
        address: mockAddress,
        balance: provider === 'phantom' ? '12.45 SOL' : '0.56 ETH',
        provider,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWallet(defaultWallet);
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet, disconnectWallet, isConnecting }}>
      {children}
    </WalletContext.Provider>
  );
};