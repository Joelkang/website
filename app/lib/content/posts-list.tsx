import Link from "next/link";
import { formatDate } from "@/lib/utils/dates";
import { use } from "react";
import type { listPostsMeta } from "./";
import { ExternalLink } from "lucide-react";
import React from "react";

export function PostsList({
  metaListPromise,
  show,
}: { metaListPromise: ReturnType<typeof listPostsMeta>; show?: number }) {
  const posts = use(metaListPromise);
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-4">
      {posts.slice(0, show).map((post) => (
        <React.Fragment key={post.slug}>
          <p className="text-neutral-600 dark:text-neutral-400 tabular-nums col-start-1 col-span-1 row-span-2 text-nowrap">
            {formatDate(post.publishedAt, false)}
          </p>

          <Link className="flex flex-col space-y-1 col-start-2" href={post.url}>
            <p className="text-neutral-900 dark:text-neutral-100 hover:text-brand tracking-tight flex gap-1 items-baseline">
              {post.title}
              {!post.url.startsWith("/") && (
                <ExternalLink size={16} className="inline" />
              )}
            </p>
          </Link>
          <span className="text-neutral-900 dark:text-neutral-100/50 tracking-tight col-start-2 mb-4">
            {post.summary}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}
