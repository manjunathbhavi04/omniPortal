export type Chain = {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'inactive' | 'congested';
  nativeToken: string;
  tokenSymbol: string;
};

export type Token = {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  usdValue: number;
  chain: string;
};

export type NFT = {
  id: string;
  name: string;
  image: string;
  collection: string;
  chain: string;
};

export type Transaction = {
  id: string;
  type: 'send' | 'receive' | 'bridge';
  status: 'pending' | 'completed' | 'failed';
  fromChain: string;
  toChain: string;
  token: string;
  amount: string;
  timestamp: number;
  hash: string;
};

export type WalletInfo = {
  isConnected: boolean;
  address: string;
  balance: string;
  provider: 'phantom' | 'metamask' | null;
};