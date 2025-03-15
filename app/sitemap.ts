import { listPostsMeta } from "@/lib/content";

export const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default async function sitemap() {
  const posts = (await listPostsMeta()).map((post) => ({
    url: post.url,
    lastModified: post.publishedAt,
  }))

  const routes = ["", "/landmarks", "/waypoints"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes, ...posts];
}
