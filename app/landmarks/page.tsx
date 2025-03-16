import Link from "next/link";
export const metadata = {
  title: "Work",
  description: "See my work",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-6xl tracking-tighter">Landmarks</h1>
      <p className="mb-8">Projects I've worked on</p>
      <Link href="/landmarks/dala" className="text-5xl hover:text-brand">
        Dala
      </Link>
    </section>
  );
}
