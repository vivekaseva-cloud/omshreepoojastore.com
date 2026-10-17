import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePrivateAdSubmission,
  createPendingPrivateAd,
  approveAd,
  rejectAd,
  deleteAd,
} from './ads.ts';
import type { PrivateAd } from './ads.ts';

test('validatePrivateAdSubmission checks required fields and 10 digit phone', () => {
  const invalid = validatePrivateAdSubmission({
    title: 'Hi',
    description: 'Short',
    contactNumber: '123',
  });
  assert.equal(invalid.isValid, false);

  const valid = validatePrivateAdSubmission({
    title: 'Traditional Ayurvedic Store',
    description: 'Organic herbs and original puja samagri available in Hyderabad',
    contactNumber: '7093586539',
  });
  assert.equal(valid.isValid, true);
});

test('approval workflow transitions pending ad to approved with timestamp', () => {
  const pendingAd = createPendingPrivateAd({
    title: 'Lakshmi Kuber Puja Samagri',
    category: 'Puja Samagri',
    description: 'Pure copper yantras and camphor available',
    contactNumber: '7093586539',
  });

  assert.equal(pendingAd.status, 'pending');

  const adsList: PrivateAd[] = [pendingAd];
  const approvedList = approveAd(adsList, pendingAd.id);

  assert.equal(approvedList[0].status, 'approved');
  assert.ok(approvedList[0].approvedAt);

  const rejectedList = rejectAd(approvedList, pendingAd.id);
  assert.equal(rejectedList[0].status, 'rejected');

  const emptyList = deleteAd(rejectedList, pendingAd.id);
  assert.equal(emptyList.length, 0);
});
