import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Selamat Seminar Hasil | Anjani Sekhar Arrum A.Md.Gz",
  description:
    "Halaman ucapan selamat Seminar Hasil untuk Anjani Sekhar Arrum A.Md.Gz semoga sukses dan dimudahkan segala langkahnya!",
  openGraph: {
    title: "Selamat Seminar Hasil | Anjani Sekhar Arrum A.Md.Gz",
    description:
      "Ucapan selamat dan doa terbaik untuk Anjani Sekhar Arrum A.Md.Gz atas Seminar Hasilnya.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
