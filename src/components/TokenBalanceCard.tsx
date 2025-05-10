import { Token } from '../types';
import { motion } from 'framer-motion';

type TokenBalanceCardProps = {
  token: Token;
};

const TokenBalanceCard = ({ token }: TokenBalanceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="card hover:border-white/20 transition-all"
    >
      <div className="flex items-center space-x-3">
        <img 
          src={token.icon} 
          alt={token.symbol} 
          className="w-10 h-10 rounded-full" 
        />
        <div>
          <h3 className="font-medium">{token.name}</h3>
          <div className="text-sm text-white/60">{token.symbol}</div>
        </div>
      </div>
      
      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold">{token.balance}</div>
          <div className="text-white/60">${token.usdValue.toFixed(2)}</div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-lg px-3 py-1">
          <div className="text-xs text-white/60">Chain</div>
          <div className="font-medium">
            {token.chain.charAt(0).toUpperCase() + token.chain.slice(1)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TokenBalanceCard;