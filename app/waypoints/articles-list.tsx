import Link from "next/link";
import { formatDate } from "@/lib/utils/dates";
import { use } from "react";
import type { listArticlesMeta } from "@/lib/content/articles";
import { ExternalLink } from "lucide-react";
import React from "react";

export function ArticlesList({
  listPromise,
}: { listPromise: ReturnType<typeof listArticlesMeta>; show?: number }) {
  const articles = use(listPromise);
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-4">
      {articles.map((post) => (
        <React.Fragment key={post.slug}>
          <time className="text-neutral-600 dark:text-neutral-400 col-start-1 col-span-1 row-span-2">
            {formatDate(post.publishedAt, false)}
          </time>

          <Link className="flex flex-col space-y-1 col-start-2" href={post.url}>
            <p className="text-neutral-900 dark:text-neutral-100 hover:text-brand tracking-tight flex gap-1 items-baseline">
              {post.title}
              {!post.url.startsWith("/") && (
                <ExternalLink size={16} className="inline" />
              )}
            </p>
          </Link>
          {post.summary && (
            <p className="text-neutral-900 dark:text-neutral-100/50 tracking-tight col-start-2 mb-4">
              {post.summary}
            </p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
