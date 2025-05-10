import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { supportedChains } from '../data/mockData';
import { Chain } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

type ChainSelectorProps = {
  selectedChain: Chain | null;
  onSelectChain: (chain: Chain) => void;
  label: string;
  disabled?: boolean;
};

const ChainSelector = ({ 
  selectedChain, 
  onSelectChain, 
  label,
  disabled = false
}: ChainSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectChain = (chain: Chain) => {
    onSelectChain(chain);
    setIsOpen(false);
  };

  const getStatusClass = (status: Chain['status']) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'congested': return 'status-congested';
      default: return '';
    }
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-white/80 mb-1.5">
        {label}
      </label>
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full px-4 py-3 flex items-center justify-between rounded-lg transition border ${
          isOpen 
            ? 'border-primary-500/50 bg-background-dark/80' 
            : 'border-white/10 bg-background-dark/50'
        } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-white/30'}`}
      >
        {selectedChain ? (
          <div className="flex items-center space-x-3">
            <img 
              src={selectedChain.icon} 
              alt={selectedChain.name} 
              className="w-6 h-6 rounded-full" 
            />
            <div className="flex flex-col items-start">
              <span className="font-medium">{selectedChain.name}</span>
              <div className="flex items-center space-x-1.5 text-xs text-white/60">
                <div className={`chain-status-indicator ${getStatusClass(selectedChain.status)}`} />
                <span>
                  {selectedChain.status === 'active' ? 'Active' : 
                   selectedChain.status === 'congested' ? 'Congested' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <span className="text-white/60">Select Chain</span>
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
            className="absolute mt-1 w-full z-10 rounded-lg shadow-lg bg-background-card border border-white/10 py-1 max-h-60 overflow-auto"
          >
            {supportedChains.map((chain) => (
              <button
                key={chain.id}
                type="button"
                onClick={() => handleSelectChain(chain)}
                className="w-full px-4 py-2.5 flex items-center space-x-3 hover:bg-white/5 transition"
              >
                <img 
                  src={chain.icon} 
                  alt={chain.name} 
                  className="w-6 h-6 rounded-full" 
                />
                <div className="flex flex-col items-start">
                  <span className="font-medium">{chain.name}</span>
                  <div className="flex items-center space-x-1.5 text-xs text-white/60">
                    <div className={`chain-status-indicator ${getStatusClass(chain.status)}`} />
                    <span>
                      {chain.status === 'active' ? 'Active' : 
                       chain.status === 'congested' ? 'Congested' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChainSelector;