import './globals.css';

export const metadata = {
  title: 'CryptoExplor Builds',
  description: 'A registry of everything I ship — tools, apps, experiments.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}