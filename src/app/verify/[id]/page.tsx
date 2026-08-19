import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ShieldCheck, Calendar, Hash, Building2, User as UserIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import { CredLedgerLogo } from '@/components/CredLedgerLogo';
import Link from 'next/link';
import { DownloadVerifyClient } from './DownloadVerifyClient';

export default async function VerifyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const credentialId = resolvedParams.id;
  
  const certificate = await prisma.certificate.findUnique({
    where: { id: credentialId },
    include: {
      batch: {
        include: {
          organization: true,
          template: true
        }
      }
    }
  });

  if (!certificate) {
    notFound();
  }

  let dynamicData: any = {};
  try {
    dynamicData = JSON.parse(certificate.dynamicData);
  } catch (e) {
    console.error("Failed to parse dynamic data");
  }

  const issueDate = new Date(certificate.issuedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const stellarExpertUrl = certificate.transactionHash 
    ? `https://stellar.expert/explorer/testnet/tx/${certificate.transactionHash}` 
    : `https://stellar.expert/explorer/testnet/tx/${certificate.dataHash}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col relative">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-6 flex justify-between items-center relative z-20">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <CredLedgerLogo className="text-slate-900" />
        </Link>
        <div className="flex items-center gap-2 text-slate-500 font-hanken text-[14px] tracking-wide font-medium">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span>Verification Portal</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="max-w-3xl w-full bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8 md:p-14 relative overflow-hidden">
          
          {/* Decorative Corner Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent opacity-70 rounded-bl-[100px] -z-10" />
          
          {/* Status Badge */}
          <div className="flex items-center justify-center gap-2 mb-12 z-10 relative">
            <div className="bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 text-emerald-700 px-5 py-2.5 rounded-full flex items-center gap-2.5 font-hanken text-sm font-semibold tracking-wide shadow-sm">
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              Verified on Blockchain
            </div>
          </div>

          <div className="text-center mb-14 z-10 relative">
            <h1 className="font-playfair text-[36px] md:text-[52px] leading-tight text-slate-900 font-bold mb-4">
              Credential Verification
            </h1>
            <p className="font-hanken text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
              This credential has been mathematically verified on the Stellar blockchain, proving its authenticity and ensuring it has not been tampered with.
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-14 z-10 relative">
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-slate-400 font-hanken font-semibold text-xs uppercase tracking-wider mb-2">
                  <UserIcon className="w-4 h-4" /> Recipient Name
                </div>
                <div className="font-hanken text-2xl font-bold text-slate-900">
                  {dynamicData.name || certificate.recipientEmail || "N/A"}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-slate-400 font-hanken font-semibold text-xs uppercase tracking-wider mb-2">
                  <Building2 className="w-4 h-4" /> Issued By
                </div>
                <div className="font-hanken text-2xl font-bold text-slate-900">
                  {certificate.batch.organization.name}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-slate-400 font-hanken font-semibold text-xs uppercase tracking-wider mb-2">
                  <Calendar className="w-4 h-4" /> Issue Date
                </div>
                <div className="font-hanken text-2xl font-bold text-slate-900">
                  {issueDate}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-slate-400 font-hanken font-semibold text-xs uppercase tracking-wider mb-2">
                  <Hash className="w-4 h-4" /> Certificate ID
                </div>
                <div className="font-mono text-[13px] text-slate-700 font-medium break-all bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-inner">
                  {certificate.id}
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Details Box */}
          {dynamicData.eventName && (
            <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-8 rounded-2xl mb-14 z-10 relative shadow-sm">
              <div className="font-hanken text-xs font-semibold tracking-wider uppercase text-slate-400 mb-3">Event / Certification Details</div>
              <div className="font-playfair text-3xl font-bold text-slate-900">
                {dynamicData.eventName}
              </div>
            </div>
          )}

          {/* Actions */}
          <DownloadVerifyClient 
            credentialId={credentialId}
            transactionHash={certificate.dataHash}
            stellarExpertUrl={stellarExpertUrl}
            verificationTime={new Date(certificate.issuedAt).toLocaleString('en-US')}
            dynamicData={dynamicData}
          />
        </div>
      </main>
    </div>
  );
}
