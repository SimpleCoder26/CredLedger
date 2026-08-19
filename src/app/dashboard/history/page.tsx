"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle, Wallet, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { HistoryTableClient } from './HistoryTableClient';
import { useWalletStore } from '@/store/wallet';

export default function HistoryPage() {
  const { address } = useWalletStore();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPersonalizedCredentials() {
      if (!address) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/credentials?wallet=${address}`);
        if (!response.ok) {
          throw new Error('Failed to fetch credentials');
        }
        
        const data = await response.json();
        setCertificates(data.certificates || []);
      } catch (error) {
        console.error("Failed to fetch personalized credentials:", error);
        setCertificates([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPersonalizedCredentials();
  }, [address]);

  return (
    <div className="p-4 md:p-8 bg-surface-bright min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 border-b-2 border-pure-black pb-4">
          <div>
            <h1 className="font-playfair text-[48px] leading-none text-pure-black font-bold tracking-tight mb-2">Issued Credentials</h1>
            <p className="font-mono-label text-[12px] uppercase text-on-surface-variant tracking-wider">
              Manage and verify your blockchain credential history
            </p>
          </div>
          <div className="flex gap-4">
            {/* Search box moved to HistoryTableClient */}
          </div>
        </div>

        {!address ? (
          <div className="border-2 border-dashed border-outline-variant p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-surface-variant flex items-center justify-center mb-4">
              <Wallet className="w-8 h-8 text-outline" />
            </div>
            <h3 className="font-dot text-[16px] uppercase text-pure-black mb-2">Wallet Disconnected</h3>
            <p className="font-mono-label text-[12px] text-on-surface-variant mb-6 max-w-md">
              Please connect your Freighter wallet to view the personalized credentials issued by your account.
            </p>
          </div>
        ) : isLoading ? (
          <div className="border-2 border-dashed border-outline-variant p-12 text-center flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-outline animate-spin mb-4" />
            <p className="font-mono-label text-[12px] text-on-surface-variant uppercase">
              Loading your issued credentials...
            </p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="border-2 border-dashed border-outline-variant p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-surface-variant flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-outline" />
            </div>
            <h3 className="font-dot text-[16px] uppercase text-pure-black mb-2">No Credentials Issued Yet</h3>
            <p className="font-mono-label text-[12px] text-on-surface-variant mb-6 max-w-md">
              You haven't issued any certificates on the blockchain from this wallet. Head over to the issuance page to get started.
            </p>
            <Link 
              href="/dashboard/issue"
              className="bg-primary text-pure-white px-6 py-3 font-dot text-[12px] uppercase hover:bg-inverse-surface transition-colors inline-flex items-center gap-2"
            >
              Issue Credentials <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <HistoryTableClient certificates={certificates.map(c => ({
            id: c.id,
            recipientEmail: c.recipientEmail,
            dynamicData: c.dynamicData,
            issuedAt: c.issuedAt,
            dataHash: c.dataHash
          }))} />
        )}
      </div>
    </div>
  );
}
