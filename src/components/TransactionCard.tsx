import { 
  ArrowRight, CheckCircle2, AlertCircle, Clock, ExternalLink
} from 'lucide-react';
import { Transaction } from '../types';
import { supportedChains } from '../data/mockData';
import { motion } from 'framer-motion';

type TransactionCardProps = {
  transaction: Transaction;
};

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const fromChain = supportedChains.find(chain => chain.id === transaction.fromChain);
  const toChain = supportedChains.find(chain => chain.id === transaction.toChain);
  
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };
  
  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-success-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-error-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (transaction.status) {
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return '';
    }
  };

  const typeText = transaction.type === 'bridge' ? 'Bridge' : 
                  transaction.type === 'send' ? 'Send' : 'Receive';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card mb-4 hover:border-white/20 transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="font-medium">
            {typeText} {transaction.amount} {transaction.token}
          </span>
        </div>
        <div className="flex items-center text-sm text-white/60">
          {formatTimestamp(transaction.timestamp)}
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          {fromChain && (
            <img 
              src={fromChain.icon} 
              alt={fromChain.name} 
              className="w-5 h-5 rounded-full" 
            />
          )}
          <span>{fromChain?.name || transaction.fromChain}</span>
        </div>
        
        <ArrowRight className="h-4 w-4 text-white/40 mx-2" />
        
        <div className="flex items-center space-x-2">
          {toChain && (
            <img 
              src={toChain.icon} 
              alt={toChain.name} 
              className="w-5 h-5 rounded-full" 
            />
          )}
          <span>{toChain?.name || transaction.toChain}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-1 text-sm">
          <span className="text-white/60">Tx Hash:</span>
          <span className="font-mono">{transaction.hash.slice(0, 8)}...{transaction.hash.slice(-4)}</span>
          <a href="#" className="text-primary-400 hover:text-primary-300 ml-1">
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className={`badge ${
          transaction.status === 'completed' ? 'badge-success' :
          transaction.status === 'pending' ? 'badge-warning' :
          'badge-error'
        }`}>
          {getStatusText()}
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;