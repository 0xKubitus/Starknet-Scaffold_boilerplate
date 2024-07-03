import Link from "next/link";

import Header from "@/app/components/ui_components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around py-24 md:p-24">
      <Header />

      <section>
        <p>HOME PAGE</p>

        <Link href="/new_event">
          <button className="border border-blue-500 p-2">
            Create your Event!
          </button>
        </Link>
      </section>
    </main>
  );
}
