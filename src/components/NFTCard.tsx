import { ExternalLink } from 'lucide-react';
import { NFT } from '../types';
import { supportedChains } from '../data/mockData';
import { motion } from 'framer-motion';

type NFTCardProps = {
  nft: NFT;
};

const NFTCard = ({ nft }: NFTCardProps) => {
  const chain = supportedChains.find(c => c.id === nft.chain);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
      className="card p-4 overflow-hidden transition-all duration-300"
    >
      <div className="relative rounded-lg overflow-hidden aspect-square mb-3 bg-background-dark/50">
        <img 
          src={nft.image} 
          alt={nft.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
        />
        <div className="absolute top-2 right-2">
          <div className="flex items-center space-x-1 bg-background-dark/80 backdrop-blur-sm rounded-full px-2 py-1">
            {chain && (
              <img 
                src={chain.icon} 
                alt={chain.name} 
                className="w-4 h-4 rounded-full" 
              />
            )}
            <span className="text-xs font-medium">{chain?.name}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-base mb-1">{nft.name}</h3>
          <p className="text-sm text-white/60">{nft.collection}</p>
        </div>
        <a 
          href="#" 
          className="text-primary-400 hover:text-primary-300 transition"
          title="View on Explorer"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default NFTCard;