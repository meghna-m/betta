import type { Metadata } from 'next';

import styles from './Layout.module.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Meghna Mangat',
  description:
    'A portfolio website showcasing projects, skills, and experiences.',
  icons: {
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>{children}</body>
    </html>
  );
}
