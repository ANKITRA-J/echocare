import { useState, useCallback } from 'react';

interface AlgorandWallet {
  address: string;
  balance: number;
  connected: boolean;
}

interface ConsentNFT {
  id: string;
  assetId: number;
  name: string;
  description: string;
  createdAt: Date;
  isActive: boolean;
  metadata: {
    consentType: string;
    dataTypes: string[];
    expiresAt?: Date;
  };
}

export const useAlgorand = () => {
  const [wallet, setWallet] = useState<AlgorandWallet | null>(null);
  const [consentNFTs, setConsentNFTs] = useState<ConsentNFT[]>([
    {
      id: 'ALG-7829304',
      assetId: 7829304,
      name: 'EchoCare Consent Token',
      description: 'Blockchain-secured consent for AI memory processing',
      createdAt: new Date('2024-01-15'),
      isActive: true,
      metadata: {
        consentType: 'full_ai_processing',
        dataTypes: ['voice', 'images', 'personal_data', 'memories'],
        expiresAt: new Date('2025-01-15'),
      },
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock wallet data
      const mockWallet: AlgorandWallet = {
        address: 'ECHOCARE7XAMPLE8WALLET9ADDRESS0ALGORAND1234567890',
        balance: 15.42,
        connected: true,
      };

      setWallet(mockWallet);
      return mockWallet;
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet(null);
  }, []);

  const createConsentNFT = useCallback(async (consentData: {
    consentType: string;
    dataTypes: string[];
    expiresAt?: Date;
  }) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate NFT creation on Algorand
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newNFT: ConsentNFT = {
        id: `ALG-${Math.floor(Math.random() * 10000000)}`,
        assetId: Math.floor(Math.random() * 10000000),
        name: 'EchoCare Consent Token',
        description: 'Blockchain-secured consent for AI processing',
        createdAt: new Date(),
        isActive: true,
        metadata: consentData,
      };

      setConsentNFTs(prev => [...prev, newNFT]);
      return newNFT;
    } catch (err: any) {
      setError(err.message || 'Failed to create consent NFT');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const revokeConsent = useCallback(async (nftId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate consent revocation
      await new Promise(resolve => setTimeout(resolve, 1000));

      setConsentNFTs(prev => 
        prev.map(nft => 
          nft.id === nftId 
            ? { ...nft, isActive: false }
            : nft
        )
      );

      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to revoke consent');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getConsentStatus = useCallback((dataType: string) => {
    const activeConsent = consentNFTs.find(nft => 
      nft.isActive && 
      nft.metadata.dataTypes.includes(dataType) &&
      (!nft.metadata.expiresAt || nft.metadata.expiresAt > new Date())
    );

    return {
      hasConsent: !!activeConsent,
      consentNFT: activeConsent,
      expiresAt: activeConsent?.metadata.expiresAt,
    };
  }, [consentNFTs]);

  const viewOnExplorer = useCallback((assetId: number) => {
    const explorerUrl = `https://algoexplorer.io/asset/${assetId}`;
    window.open(explorerUrl, '_blank');
  }, []);

  return {
    wallet,
    consentNFTs,
    loading,
    error,
    connectWallet,
    disconnectWallet,
    createConsentNFT,
    revokeConsent,
    getConsentStatus,
    viewOnExplorer,
  };
};