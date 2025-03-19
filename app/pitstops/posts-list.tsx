import type { listPosts } from "@/lib/content/atproto";
import { formatDate } from "@/lib/utils/dates";
import { AppBskyFeedPost } from "@atproto/api";
import { use } from "react";
export function PostsList({
  listPromise,
}: { listPromise: ReturnType<typeof listPosts> }) {
  const posts = use(listPromise);
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-4">
      {posts.map((feedPost) => {
        const post = feedPost.post;
        const validation = AppBskyFeedPost.validateRecord(post.record);
        if (!validation.success) throw validation.error;

        const record = validation.value;

        return (
          <article key={post.uri} className="grid grid-cols-subgrid col-span-2">
            <aside className="text-neutral-600 dark:text-neutral-400">
              <time>{formatDate(record.createdAt, false)}</time>
            </aside>
            <p className="">{record.text}</p>
          </article>
        );
      })}
    </div>
  );
}