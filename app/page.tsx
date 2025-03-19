import { PostsList } from "@/lib/content/posts-list";
import { listPostsMeta } from "@/lib/content";
import Colophon from "./colophon.mdx";
import { Brain, Map as MapIcon } from "lucide-react";
import { SiGithub, SiBluesky } from "@icons-pack/react-simple-icons";

export default function Page() {
  const posts = listPostsMeta();
  return (
    <section>
      <h1 className="text-6xl font-semiboldtracking-tighter">Joel Kang</h1>
      <div className="mb-8 text-lg flex flex-col">
        <h2 className="text-white/50">
          Product Engineer × Context Cartographer
        </h2>
        <div className="flex gap-2">
          <a
            href="https://github.com/joelkang"
            rel="noopener noreferrer"
            className="inline-flex items-baseline text-white/50 hover:text-brand"
          >
            <SiGithub size={20} />
          </a>
          <a
            href="https://bsky.app/profile/joelkang.com"
            rel="noopener noreferrer"
            className="inline-flex items-baseline text-white/50 hover:text-brand"
          >
            <SiBluesky size={20} />
          </a>
        </div>
      </div>
      <section className="prose prose-invert prose-xl leading-normal mb-4">
        <Colophon />
      </section>
      <div className="my-8">
        <h2 className="text-xl mb-4 font-semibold">Latest thoughts</h2>
        <PostsList metaListPromise={posts} show={5} />
      </div>
    </section>
  );
}
