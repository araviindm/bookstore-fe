import "@/styles/globals.css";
import Providers from "@/utils/Providers";
export const metadata = {
  title: "Book store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
