import { PostsList } from "./posts-list";
import { listPosts } from "@/lib/content/atproto";
import React, { Suspense } from "react";

export const metadata = {
  title: "Pit stops",
  description: "Musings and outbursts",
};
export default async function PitStops() {
  const posts = listPosts();
  return (
    <section>
      <h1 className="font-semibold text-6xl tracking-tighter">Pitstops</h1>
      <p className="mb-8">Musings and outbursts</p>
      <Suspense fallback={"Fetching..."}>
        <PostsList listPromise={posts} />
      </Suspense>
    </section>
  );
}