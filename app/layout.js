import './globals.css';

export const metadata = {
  metadataBase: new URL('https://web-toppay.in'),
  title: 'TopPay Login | Secure Account Access',
  description: 'Sign in to TopPay to access your account dashboard and available payment tools through the mobile-friendly TopPay web app.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'TopPay Login | Secure Account Access',
    description: 'Sign in to access your TopPay account dashboard and available payment tools.',
    url: '/',
    siteName: 'TopPay',
    images: [{ url: '/toppay-logo.png', alt: 'TopPay logo' }],
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
