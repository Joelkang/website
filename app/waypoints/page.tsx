import { ArticlesList } from "@/waypoints/articles-list";
import { listArticlesMeta } from "@/lib/content/articles";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  const posts = listArticlesMeta();
  return (
    <section>
      <h1 className="font-semibold text-6xl tracking-tighter">Waypoints</h1>
      <p className="mb-8">Discoveries I've made a long the way.</p>
      <ArticlesList listPromise={posts} />
    </section>
  );
}
