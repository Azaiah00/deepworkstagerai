'use client';

import { useEffect, useState } from 'react';
import PlatformLayout from '@/components/PlatformLayout';

type Integration = {
  id: string;
  platform: string;
  credentials: any;
  isActive: boolean;
  lastVerified?: string | null;
};

export default function IntegrationsPage() {
  const [items, setItems] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const r = await fetch('/api/integrations');
    const j = await r.json();
    setItems(j.integrations || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (platform: string, credentials: any) => {
    setMessage(null);
    const r = await fetch('/api/integrations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, credentials }),
    });
    if (r.ok) {
      setMessage('Saved.');
      load();
    } else {
      const j = await r.json().catch(() => ({}));
      setMessage(j.error || 'Failed.');
    }
  };

  return (
    <PlatformLayout title="Integrations" subtitle="Connect your website and social channels for auto‑publishing">
      <div className="max-w-5xl mx-auto space-y-8">
        {message && (<div className="p-3 rounded bg-green-600/20 border border-green-600/30">{message}</div>)}

        <section className="glass-card premium-card rounded-2xl p-6 border border-[#DC2626]/20">
          <h2 className="text-xl font-bold mb-2">Website Publishing</h2>
          <p className="text-gray-400 mb-4">Connect your CMS to publish vehicles automatically after staging.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CmsCard
              name="WordPress"
              fields={[{ key: 'baseUrl', label: 'Site URL' }, { key: 'username', label: 'Username' }, { key: 'appPassword', label: 'Application Password' }]}
              onSave={(cred) => save('wordpress', cred)}
              existing={items.find(i => i.platform === 'wordpress')}
            />
            <CmsCard
              name="Webflow"
              fields={[{ key: 'apiToken', label: 'API Token' }, { key: 'siteId', label: 'Site ID' }, { key: 'collectionId', label: 'Collection ID' }]}
              onSave={(cred) => save('webflow', cred)}
              existing={items.find(i => i.platform === 'webflow')}
            />
            <CmsCard
              name="Feed (Pull)"
              fields={[{ key: 'note', label: 'Use the feed URL shown after saving' }]}
              readOnly
              onSave={(cred) => save('feed', cred)}
              existing={items.find(i => i.platform === 'feed')}
            />
          </div>

          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2 font-semibold text-gray-300">Instructions</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Choose your platform and enter the credentials.</li>
              <li>Click Save. We store credentials securely and verify on first publish.</li>
              <li>Turn on Auto‑publish in Studio or Projects to publish right after staging.</li>
              <li>No CMS? Save the Feed integration and we’ll provide a signed URL you can pull every 5–15 minutes.</li>
            </ol>
          </div>
        </section>

        <section className="glass-card premium-card rounded-2xl p-6 border border-[#DC2626]/20">
          <h2 className="text-xl font-bold mb-2">Social Channels</h2>
          <p className="text-gray-400 mb-4">Connect accounts for auto‑posting and scheduling.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CmsCard name="Facebook/Instagram" fields={[{ key: 'accessToken', label: 'Access Token' }, { key: 'pageId', label: 'Page/IG Business ID' }]} onSave={(c) => save('facebook', c)} existing={items.find(i => i.platform === 'facebook')} />
            <CmsCard name="LinkedIn" fields={[{ key: 'accessToken', label: 'Access Token' }, { key: 'organizationId', label: 'Organization ID' }]} onSave={(c) => save('linkedin', c)} existing={items.find(i => i.platform === 'linkedin')} />
            <CmsCard name="X (Twitter)" fields={[{ key: 'apiKey', label: 'API Key' }, { key: 'apiSecret', label: 'API Secret' }, { key: 'accessToken', label: 'Access Token' }]} onSave={(c) => save('twitter', c)} existing={items.find(i => i.platform === 'twitter')} />
          </div>
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2 font-semibold text-gray-300">Instructions</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Connect business accounts (Page, IG Business, Organization).</li>
              <li>We post with your brand kit and track performance automatically.</li>
              <li>You can also schedule posts from the Social module calendar.</li>
            </ol>
          </div>
        </section>
      </div>
    </PlatformLayout>
  );
}

function CmsCard({ name, fields, onSave, existing, readOnly = false }: { name: string; fields: { key: string; label: string }[]; onSave: (c: any) => void; existing?: Integration; readOnly?: boolean }) {
  const [form, setForm] = useState<Record<string, string>>({});
  return (
    <div className="rounded-xl border border-[#DC2626]/20 p-4 bg-[#0B0F14]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">{name}</h3>
        {existing?.isActive && <span className="text-xs px-2 py-1 rounded bg-green-600/20 text-green-400">Connected</span>}
      </div>
      <div className="space-y-3">
        {fields.map(f => (
          <div key={f.key}>
            <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
            <input disabled={readOnly} className="w-full rounded bg-[#0A0A0A] border border-gray-700 px-3 py-2" value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {!readOnly && <button onClick={() => onSave(form)} className="btn-premium px-4 py-2">Save</button>}
        {existing?.platform === 'feed' && (
          <FeedHelp />
        )}
      </div>
    </div>
  );
}

function FeedHelp() {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    // Dummy sample info; real page will call /api/me to get userId
    const userId = 'me'; // placeholder; replace with real user id from session endpoint if desired
    const token = typeof window !== 'undefined' && (window as any).FEED_TOKEN_SAMPLE;
    if (userId && token) setUrl(`/api/feed?userId=${userId}&token=${token}`);
  }, []);
  return (
    <div className="text-sm text-gray-400">
      <p className="mb-1">Pull this signed JSON feed from your website cron/integration. Refresh every 5–15 minutes.</p>
      {url ? (
        <code className="text-xs break-all">{url}</code>
      ) : (
        <p className="text-xs">Feed URL will appear after account setup.</p>
      )}
    </div>
  );
}


