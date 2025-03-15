import { baseUrl } from "@/sitemap";
import { listPostsMeta } from "@/lib/content";
export async function GET() {
  const allPosts = await listPostsMeta();

  const itemsXml = allPosts
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${post.url.startsWith("/") ? `${baseUrl}${post.url}` : post.url}</link>
          <description>${post.summary || ""}</description>
          <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        </item>`,
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Joel Kang</title>
        <link>${baseUrl}</link>
        <description>A history of context cartography</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
