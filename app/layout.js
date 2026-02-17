import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"], // لازم تضيف وزن
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata = {
  title: "بطاقة تهنئة لشهر رمضان",
  description: "بطاقة تهنئة لشهر رمضان المبارك مقدمة من اتحاد الغرف التجارية السعودية.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
