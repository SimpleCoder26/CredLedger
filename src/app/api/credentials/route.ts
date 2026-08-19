import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wallet = searchParams.get('wallet');

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Find the organization for this wallet
    const organization = await prisma.organization.findUnique({
      where: { wallet },
      include: {
        batches: {
          include: {
            certificates: {
              orderBy: { issuedAt: 'desc' },
            },
          },
        },
      },
    });

    if (!organization) {
      // If organization doesn't exist, they have no certificates
      return NextResponse.json({ certificates: [] });
    }

    // Flatten all certificates from all batches
    const certificates = organization.batches.flatMap(batch => batch.certificates);

    // Sort globally across all batches
    certificates.sort((a, b) => b.issuedAt.getTime() - a.issuedAt.getTime());

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error('Error fetching personalized credentials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch credentials' },
      { status: 500 }
    );
  }
}
