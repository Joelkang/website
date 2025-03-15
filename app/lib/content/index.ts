"use server";
import { listMdxPosts } from "./markdown";
import { importMdxPost } from "./markdown";
import { listDevToPosts } from "./devto";

export type PostMetadata = {
  id: string;
  type: string;
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  original?: string;
  url: string;
};

export async function listPostsMeta() {
  return [...(await listMdxPosts()), ...(await listDevToPosts())].sort(
    (a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1;
      }
      return 1;
    },
  );
}

export { importMdxPost };