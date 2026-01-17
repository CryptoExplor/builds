import './globals.css';

export const metadata = {
  title: 'Builds by CryptoExplor',
  description: 'Everything I build — tools, apps, experiments',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}