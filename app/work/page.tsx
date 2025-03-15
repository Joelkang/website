import { BlogPosts } from "app/components/posts";

export const metadata = {
	title: "Work",
	description: "See my work",
};

export default function Page() {
	return (
		<section>
			<h1 className="font-semibold text-2xl mb-8 tracking-tighter">Work</h1>
			<BlogPosts />
		</section>
	);
}
