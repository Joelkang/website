import { listPostsMeta } from "@/lib/content";

export const baseUrl = "https://joelkang.com";

export default async function sitemap() {
  const posts = (await listPostsMeta()).map((post) => ({
    url: post.url,
    lastModified: post.publishedAt,
  }))

  const routes = ["", "/posts", "/work"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes, ...posts];
}
