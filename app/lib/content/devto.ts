import type { ArticleMeta } from "./articles";

type DevToArticle = {
  type_of: "article";
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: null;
  crossposted_at: null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string;
  tags: string[];
  body_html: string;
  body_markdown: string;
  user: {
    name: string;
    username: string;
    twitter_username: string;
    github_username: string;
    user_id: number;
    website_url: null;
    profile_image: string;
    profile_image_90: string;
  };
  flare_tag: {
    name: string;
    bg_color_hex: string;
    text_color_hex: string;
  };
};

async function getDevToPosts() {
  const posts = await fetch(
    "https://dev.to/api/articles/me/published?page=1&per_page=100",
    {
      headers: {
        accept: "application/vnd.forem.api-v1+json",
        "content-type": "application/json",
        "api-key": `${process.env.DEV_TO_API_KEY}`,
      },
    },
  );
  if (!posts.ok) {
    console.error(posts.statusText);
    return [];
  }

  return (await posts.json()) as DevToArticle[];
}

export async function listDevToPosts() {
  const devToPosts = await getDevToPosts();
  return devToPosts.map(
    (post) =>
      ({
        type: post.type_of,
        id: `${post.id}`,
        publishedAt: post.published_at,
        title: post.title,
        summary: post.description,
        url: post.canonical_url,
        slug: post.slug,
      }) satisfies ArticleMeta,
  );
}