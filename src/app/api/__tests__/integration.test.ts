import { describe, it, expect, vi } from 'vitest';
import { POST } from '../issue/route';
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

// Mock Prisma for the integration test to prevent real DB writes during testing
vi.mock('@/lib/prisma', () => ({
  prisma: {
    organization: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
    },
    template: {
      findUnique: vi.fn(),
      findFirst: vi.fn(),
    },
    certificateBatch: {
      create: vi.fn(),
    },
    certificate: {
      createMany: vi.fn(),
      findMany: vi.fn(),
    }
  },
}));

describe('Integration Test: /api/issue', () => {
  it('should return 400 if required payload fields are missing', async () => {
    // Missing required fields like 'batchName', 'templateId', etc.
    const req = new NextRequest('http://localhost:3000/api/issue', {
      method: 'POST',
      body: JSON.stringify({
        orgName: 'Test Org'
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('Missing required fields');
  });

  it('should process a valid request and return success (mocked DB)', async () => {
    // Mock successful DB queries
    (prisma.organization.findUnique as any).mockResolvedValue({ id: 'org-1' });
    (prisma.organization.findFirst as any).mockResolvedValue({ id: 'org-1' });
    (prisma.template.findUnique as any).mockResolvedValue({ id: 'tpl-1' });
    (prisma.template.findFirst as any).mockResolvedValue({ id: 'tpl-1' });
    (prisma.certificateBatch.create as any).mockResolvedValue({
      id: 'batch-1',
      certificates: [{ id: 'cert-1', dataHash: 'hash1' }]
    });
    (prisma.certificate.findMany as any).mockResolvedValue([
      { id: 'cert-1', dataHash: 'hash1', recipientEmail: 'alice@test.com' }
    ]);

    const req = new NextRequest('http://localhost:3000/api/issue', {
      method: 'POST',
      body: JSON.stringify({
        orgName: 'Test Org',
        orgWebsite: 'https://test.com',
        batchName: 'Cohort 1',
        templateId: 'tpl-1',
        records: [{ name: 'Alice' }]
      })
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.batchId).toBe('batch-1');
  });
});
