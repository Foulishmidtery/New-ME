import "./globals.css";

export const metadata = {
  title: "CMS KNEKS",
  description: "Content management system KNEKS",
};

export default function RootLayout({ children }) {
  return <html lang="id"><body>{children}</body></html>;
}
