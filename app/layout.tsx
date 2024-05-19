import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const plusjakartasans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://huffle.mgkusumaputra.me"),
  title: {
    default: "Huffle | Gampang Milih Semuanya!",
    template: "%s | Huffle",
  },
  description:
    "Lebih gampang atur kelompok, buat piket, pilih nama dan angka acak bareng Huffle",
  openGraph: {
    title: "Huffle | Gampang Milih Semuanya!",
    description:
      "Lebih gampang atur kelompok, buat piket, pilih nama dan angka acak bareng Huffle",
    url: "https://huffle.mgkusumaputra.me",
    siteName: "Huffle",
    type: "website",
  },
  twitter: {
    title: "Huffle | Gampang Milih Semuanya!",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusjakartasans.className}>
        <main className="flex flex-col my-4 mx-auto max-w-2xl max-sm:px-5">
          <Navbar />
          <div className="px-5 mb-24">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}

