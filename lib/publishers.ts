// Publisher adapter stubs. Replace with real API calls.

export type WebsiteCredentials =
  | { platform: 'wordpress'; baseUrl: string; username: string; appPassword: string }
  | { platform: 'webflow'; apiToken: string; siteId: string; collectionId: string }
  | { platform: 'feed' };

export async function publishToWebsite(params: { creds: WebsiteCredentials; project: any }) {
  const { creds, project } = params;
  try {
    if (creds.platform === 'wordpress') {
      // Placeholder: WordPress REST API push
      // await fetch(`${creds.baseUrl}/wp-json/wp/v2/vehicle`, { ...auth, body: {...} })
      return { ok: true };
    }
    if (creds.platform === 'webflow') {
      // Placeholder: Webflow CMS API push
      return { ok: true };
    }
    if (creds.platform === 'feed') {
      // Nothing to push; site will pull from feed
      return { ok: true };
    }
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'publisher error' } as any;
  }
}

export async function publishToSocial(params: { platforms: string[]; tokens: any; project: any; caption?: string }) {
  // TODO: implement FB/IG/LinkedIn/X publishing
  return { ok: true };
}


