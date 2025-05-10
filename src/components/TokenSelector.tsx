import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { tokens } from '../data/mockData';
import { Token } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

type TokenSelectorProps = {
  selectedToken: Token | null;
  onSelectToken: (token: Token) => void;
};

const TokenSelector = ({ 
  selectedToken, 
  onSelectToken 
}: TokenSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery('');
    }
  };

  const handleSelectToken = (token: Token) => {
    onSelectToken(token);
    setIsOpen(false);
  };

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full px-4 py-3 flex items-center justify-between rounded-lg transition border ${
          isOpen 
            ? 'border-primary-500/50 bg-background-dark/80' 
            : 'border-white/10 bg-background-dark/50'
        } hover:border-white/30`}
      >
        {selectedToken ? (
          <div className="flex items-center space-x-2">
            <img 
              src={selectedToken.icon} 
              alt={selectedToken.symbol} 
              className="w-6 h-6 rounded-full" 
            />
            <span className="font-medium">{selectedToken.symbol}</span>
          </div>
        ) : (
          <span className="text-white/60">Select Token</span>
        )}
        <ChevronDown 
          className={`w-5 h-5 text-white/60 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-1 z-10 w-full rounded-lg shadow-lg bg-background-card border border-white/10 overflow-hidden"
          >
            <div className="p-3 border-b border-white/10">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-white/40" />
                </div>
                <input
                  type="text"
                  placeholder="Search tokens"
                  className="w-full bg-background-dark border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            
            <div className="max-h-56 overflow-y-auto py-1">
              {filteredTokens.length > 0 ? (
                filteredTokens.map((token) => (
                  <button
                    key={`${token.symbol}-${token.chain}`}
                    type="button"
                    onClick={() => handleSelectToken(token)}
                    className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-white/5 transition"
                  >
                    <div className="flex items-center space-x-3">
                      <img 
                        src={token.icon} 
                        alt={token.symbol} 
                        className="w-6 h-6 rounded-full" 
                      />
                      <div className="text-left">
                        <div className="font-medium">{token.symbol}</div>
                        <div className="text-xs text-white/60">{token.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{token.balance}</div>
                      <div className="text-xs text-white/60">${token.usdValue.toFixed(2)}</div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-center text-white/60">
                  No tokens found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TokenSelector;