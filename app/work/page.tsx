import Link from "next/link";
export const metadata = {
	title: "Work",
	description: "See my work",
};

export default function Page() {
	return (
  <section>
    <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Work</h1>
    <Link href="/work/dala">Dala</Link>
  </section>
);
}
