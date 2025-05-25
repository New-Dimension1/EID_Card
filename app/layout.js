import { Geist, Geist_Mono ,Alexandria } from "next/font/google";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "بطاقة تهنئة عيد الأضحى",
  description: "بطاقة تهنئة بعيد الأضحى المبارك مقدمة من اتحاد الغرف التجارية السعودية.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${alexandria.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
