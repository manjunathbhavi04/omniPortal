import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ActivitySquare, Image, ExternalLink } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import TransactionCard from '../components/TransactionCard';
import TokenBalanceCard from '../components/TokenBalanceCard';
import NFTCard from '../components/NFTCard';
import { tokens, recentTransactions, nfts } from '../data/mockData';
import ConnectWalletButton from '../components/ConnectWalletButton';

const Dashboard = () => {
  const { wallet } = useWallet();
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts'>('tokens');

  // If wallet is not connected, show connect wallet screen
  if (!wallet.isConnected) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center glass-card">
          <Wallet className="h-16 w-16 text-primary-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="text-white/70 mb-8">
            Please connect your wallet to view your dashboard and manage your cross-chain assets.
          </p>
          <ConnectWalletButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-white/70">
              Manage your cross-chain assets and view transaction history
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/bridge" className="btn-accent">
              Bridge Assets
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {/* Asset Section */}
          <div className="card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Assets</h2>
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('tokens')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeTab === 'tokens'
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Tokens
                </button>
                <button
                  onClick={() => setActiveTab('nfts')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    activeTab === 'nfts'
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  NFTs
                </button>
              </div>
            </div>
            
            {activeTab === 'tokens' ? (
              <div className="space-y-4">
                {tokens.map((token, index) => (
                  <motion.div
                    key={`${token.symbol}-${token.chain}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <TokenBalanceCard token={token} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nfts.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <NFTCard nft={nft} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Link 
              to="/bridge" 
              className="glass-card flex flex-col items-center text-center hover:border-primary-500/30 transition"
            >
              <div className="p-4 rounded-full bg-primary-500/10 mb-3">
                <ArrowUpRight className="h-6 w-6 text-primary-400" />
              </div>
              <h3 className="font-semibold mb-1">Bridge Assets</h3>
              <p className="text-sm text-white/60">Transfer tokens across chains</p>
            </Link>
            
            <Link 
              to="/dashboard" 
              className="glass-card flex flex-col items-center text-center hover:border-secondary-500/30 transition"
            >
              <div className="p-4 rounded-full bg-secondary-500/10 mb-3">
                <ActivitySquare className="h-6 w-6 text-secondary-400" />
              </div>
              <h3 className="font-semibold mb-1">Transaction History</h3>
              <p className="text-sm text-white/60">View your past activities</p>
            </Link>
          </div>
        </div>
        
        {/* Transaction History */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <a href="#" className="text-primary-400 hover:text-primary-300 text-sm">
                View All
              </a>
            </div>
            
            <div className="space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((transaction) => (
                  <TransactionCard 
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              ) : (
                <div className="text-center p-6 border border-dashed border-white/10 rounded-lg">
                  <ActivitySquare className="h-10 w-10 text-white/40 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">No transactions yet</h3>
                  <p className="text-sm text-white/60 mb-4">
                    Start bridging assets to see your transaction history
                  </p>
                  <Link to="/bridge" className="btn-outline">
                    Bridge Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;