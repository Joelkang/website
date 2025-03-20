import { ArticlesList } from "@/waypoints/articles-list";
import { PostsList } from "@/pitstops/posts-list";
import { listArticlesMeta } from "@/lib/content/articles";
import Colophon from "./colophon.mdx";

import { SiGithub, SiBluesky } from "@icons-pack/react-simple-icons";
import { listPosts } from "./lib/content/atproto";
import { Link } from "@/components/link";
import { Suspense } from "react";

export default function Page() {
  const posts = listPosts(5);
  const articles = listArticlesMeta(3);

  return (
    <section>
      <h1 className="text-6xl font-semiboldtracking-tighter">Joel Kang</h1>
      <div className="mb-8 text-lg flex flex-col">
        <h2 className="-mt-1 text-white/50 mb-1">
          Context Cartographer × Product Engineer
        </h2>
        <div className="flex gap-2">
          <Link
            href="https://github.com/joelkang"
            className="inline-flex items-baseline text-white/50"
          >
            <SiGithub size={20} />
          </Link>
          <Link
            href="https://bsky.app/profile/joelkang.com"
            className="inline-flex items-baseline text-white/50 "
          >
            <SiBluesky size={20} />
          </Link>
        </div>
      </div>
      <section className="prose prose-invert prose-xl leading-normal mb-4">
        <Colophon />
      </section>
      <div className="my-8">
        <h2 className="text-xl mb-4 font-semibold">Latest Pitstops</h2>
        <Suspense fallback="Fetching posts...">
          <PostsList listPromise={posts} />
        </Suspense>
      </div>
      <div className="my-8">
        <h2 className="text-xl mb-4 font-semibold">Latest Waypoints</h2>
        <Suspense fallback="Fetching articles...">
          <ArticlesList listPromise={articles} show={5} />
        </Suspense>
      </div>
    </section>
  );
}
