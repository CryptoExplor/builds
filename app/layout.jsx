import './globals.css';
import { PROFILE } from '@/lib/profile';

// metadataBase is required for the per-tool openGraph/twitter image URLs in
// app/tools/[slug]/page.jsx to resolve to absolute URLs when shared.
export const metadata = {
  metadataBase: new URL(PROFILE.website),
  title: {
    default: `Builds by ${PROFILE.handle}`,
    template: `%s | Builds by ${PROFILE.handle}`,
  },
  description: `${PROFILE.tagline} — ${PROFILE.positioning}`,
  keywords: [
    'web3',
    'blockchain',
    'farcaster',
    'mini apps',
    'evm',
    'base',
    'celo',
    'stacks',
    'automation',
    'defi',
    'nft',
    PROFILE.handle,
  ],
  authors: [{ name: PROFILE.name, url: PROFILE.github }],
  creator: PROFILE.handle,
  openGraph: {
    title: `Builds by ${PROFILE.handle}`,
    description: `${PROFILE.tagline} — ${PROFILE.positioning}`,
    url: PROFILE.website,
    siteName: `Builds by ${PROFILE.handle}`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Builds by ${PROFILE.handle}`,
    description: `${PROFILE.tagline} — ${PROFILE.positioning}`,
    creator: PROFILE.twitterHandle,
  },
  alternates: {
    canonical: PROFILE.website,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
