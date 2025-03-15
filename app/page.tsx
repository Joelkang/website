import { PostsList } from "@/lib/content/posts-list";
import { listPostsMeta } from "@/lib/content";
import Colophon from "./colophon.mdx";
export default function Page() {
  const posts = listPostsMeta();
  return (
    <section>
      <h1 className="text-6xl font-semibold">Hi, I'm Joel Kang</h1>
      <h2 className="mb-8 text-lg">
        <span className="opacity-30">
          Product Engineer × Context Cartographer 
        </span>{" "}
      </h2>
      <section className="prose prose-xl leading-normal mb-4">
        <Colophon />
      </section>
      <div className="my-8">
        <h2 className="text-xl mb-4 font-semibold">Latest thoughts</h2>
        <PostsList metaListPromise={posts} show={5} />
      </div>
    </section>
  );
}
