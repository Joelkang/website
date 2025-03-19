import { AtpAgent, AppBskyFeedPost } from "@atproto/api";

export async function listPosts(count?: number) {
  const agent = new AtpAgent({
    service: "https://bsky.social",
  });
  const me = await agent.login({
    identifier: "joel@joelkang.com",
    password: `${process.env.BLUESKY_PASSWORD}`,
  });

  if (!me.success) throw me.data;

  const feedResp = await agent.app.bsky.feed.getAuthorFeed({
    actor: me.data.did,
    filter: "posts_and_author_threads",
  });
  if (!feedResp.success) throw feedResp.data;

  return feedResp.data.feed
    .filter((feedItem) => {
      const isMine = feedItem.post.author.did === me.data.did;
      return isMine && AppBskyFeedPost.isRecord(feedItem.post.record);
    })
    .slice(0, count);
}