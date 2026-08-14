import "@/fonts/drukcyr/stylesheet.css"
import "@/fonts/suisseintl/stylesheet.css"
import "./globals.css";
import State from "@/state"
import Modals from "@/components/Modals";
import Script from "next/script";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ru">
      <body>
        <State>
          {children}
          <Modals />
        </State>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DBECKKEJ8W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DBECKKEJ8W');
        `}
        </Script>
      </body>
    </html>
  );
}
