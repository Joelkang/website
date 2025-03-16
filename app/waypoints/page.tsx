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
      <h1 className="font-semibold text-6xl tracking-tighter">
        Waypoints
      </h1>
      <p className="mb-8">Discoveries I've made a long the way.</p>
      <PostsList metaListPromise={posts} />
    </section>
  );
}
