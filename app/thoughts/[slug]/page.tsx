import { notFound } from "next/navigation";
import { listPostsMeta, importMdxPost } from "@/lib/content";
import { baseUrl } from "app/sitemap";
import { formatDate } from "@/lib/utils/dates";

export async function generateStaticParams() {
  const posts = await listPostsMeta();

  return posts.map((post) => ({
    slug: post?.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(props: PageProps) {
  const { slug } = await props.params;
  const post = await importMdxPost(slug);

  if (!post) return notFound();

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  const ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Posts(props: PageProps) {
  const { slug } = await props.params;

  const post = await importMdxPost(slug);

  if (!post) return notFound();

  const { Post, metadata } = post;

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(metadata.publishedAt)}
        </p>
        {metadata.original && (
          <p>
            This post was originally published{" "}
            <a href={metadata.original}>here</a>.
          </p>
        )}
      </div>
      <article className="prose">
        <Post />
      </article>
    </section>
  );
}
