import Header from "../components/ui_components/Header";
import LinkToDevTools from "../components/ui_components/LinkToDevTools";
// import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Header />

      {children}
    </main>
  );
}
