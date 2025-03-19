import { PostsList } from "./posts-list";
import { listPosts } from "@/lib/content/atproto";
import React from "react";

export default async function PitStops() {
  const posts = listPosts();
  return (
    <section>
      <h1 className="font-semibold text-6xl tracking-tighter">Pitstops</h1>
      <p className="mb-8">Musings along the way</p>
      <PostsList listPromise={posts} />
    </section>
  );
}