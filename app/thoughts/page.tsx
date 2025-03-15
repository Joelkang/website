import { PostsList } from "@/lib/content/posts-list";
import { listPostsMeta } from "../lib/content";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const posts = listPostsMeta();
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Posts</h1>
      <PostsList metaListPromise={posts} />
    </section>
  );
}
