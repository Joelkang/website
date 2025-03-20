import { AtpAgent, AppBskyFeedPost } from "@atproto/api";

const agent: AtpAgent = new AtpAgent({
  service: "https://bsky.social",
});

async function login() {
  if (agent.hasSession && agent.session)
    return (await agent.resumeSession(agent.session)).data;

  const me = await agent.login({
    identifier: "joel@joelkang.com",
    password: `${process.env.BLUESKY_PASSWORD}`,
  });

  if (!me.success) throw me.data;
  return me.data;
}

export async function listPosts(count?: number) {
  const me = await login();
  const feedResp = await agent.app.bsky.feed.getAuthorFeed({
    actor: me.did,
    filter: "posts_and_author_threads",
  });
  if (!feedResp.success) throw feedResp.data;

  const posts = await Promise.all(
    feedResp.data.feed
      .filter((feedItem) => {
        const isMine = feedItem.post.author.did === me.did;
        return isMine && AppBskyFeedPost.isRecord(feedItem.post.record);
      })
      .map(async (feedPost) => {
        const post = feedPost.post;
        const validation = AppBskyFeedPost.validateRecord(post.record);
        if (!validation.success) return null;
        const record = validation.value;

        return {
          ...post,
          record,
        };
      }),
  );

  return posts.filter((post) => !!post).slice(0, count);
}

