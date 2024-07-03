import Header from "../components/ui_components/Header";

// import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header />

      {children}
    </section>
  );
}
