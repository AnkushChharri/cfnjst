import { Inter } from "next/font/google";
import { AddressBar } from './ui/AddressBar';
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FontsCopy.com - Copy & Paste Stylish Fonts",
  description: "FontsCopy.com offers a free, easy-to-use collection of copy and paste fonts for everyone. Enhance your social media posts, messages, and designs with just a click!",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">





      <head>




        {/* SVG as favicon */}
        <link rel="icon" href="/Fontscopy.com.png" type="image/svg+xml" />

        {/* Open Graph meta tags */}
        <meta property="og:title" content="FontsCopy.com - Copy & Paste Stylish Fonts" />
        <meta property="og:description" content="FontsCopy.com offers a free, easy-to-use collection of copy and paste fonts for everyone. Enhance your social media posts, messages, and designs with just a click!" />
        <meta property="og:image" content="/Fontscopy.com.png" />
        <meta property="og:url" content="https://Fontscopy.com" />

        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FontsCopy - Stylish Fonts" />
        <meta name="twitter:description" content="Discover and use stylish fonts with ease!" />
        <meta name="twitter:image" content="/Fontscopy.com.png" />


      </head>








      <body className={`${inter.className} bg-stone-100`}>
        <Navbar />

        <AddressBar />







        {children}
        <Footer />
      </body>
    </html>
  );
}