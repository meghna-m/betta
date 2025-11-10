import type { Metadata } from "next";
import "./globals.css";
import styles from './Layout.module.css';

export const metadata: Metadata = {
  title: "Meghna Mangat",
  description: "A portfolio website showcasing projects, skills, and experiences.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.body}>{children}</body>
    </html>
  );
}
