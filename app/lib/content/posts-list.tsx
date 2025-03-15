import Link from "next/link";
import { formatDate } from "@/lib/utils/dates";
import { use } from "react";
import type { listPostsMeta } from "./";
export function PostsList({
  metaListPromise,
  show,
}: { metaListPromise: ReturnType<typeof listPostsMeta>; show?: number }) {
  const posts = use(metaListPromise);
  return (
    <div>
      {posts.slice(0, show).map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={post.url}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums min-w-fit">
              {formatDate(post.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.title}
              <br />
              <span className="text-neutral-900 dark:text-neutral-100/50 tracking-tight">
                {post.summary}
              </span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
