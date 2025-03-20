"use client";

import type { listPosts } from "@/lib/content/atproto";
import { formatDate } from "@/lib/utils/dates";
import { AppBskyEmbedExternal } from "@atproto/api";
import { Link } from "@/components/link";
import React, { use } from "react";
import { RichText } from "@atproto/api";
import { ExternalLink } from "lucide-react";

export function PostsList({
  listPromise,
}: { listPromise: ReturnType<typeof listPosts> }) {
  const posts = use(listPromise);
  const hydratedPosts = posts.map((post) => {
    const record = post.record;
    const rt = new RichText(record);

    const externalEmbedValidation = AppBskyEmbedExternal.validateMain(
      record.embed,
    );
    const externalEmbed =
      externalEmbedValidation.success && externalEmbedValidation.value.external;

    return {
      ...post,
      record: {
        ...record,
        rt,
        externalEmbed,
      },
    };
  });
    
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-4">
      {hydratedPosts.map((post) => {
        const {
          uri,
          record: { rt, externalEmbed, ...record },
        } = post;
        return (
          <article key={uri} className="grid grid-cols-subgrid col-span-2">
            <aside>
              <Link
                href={`https://bsky.app/profile/joelkang.com/post${uri.slice(uri.lastIndexOf("/"))}`}
                className="text-neutral-600 dark:text-neutral-400 hover:text-brand"
                target="_blank"
              >
                <time>{formatDate(record.createdAt, false)}</time>
              </Link>
            </aside>
            <main className="flex flex-col gap-3">
              <p>
                {Array.from(rt.segments()).map((segment) => {
                  if (segment.isLink() && segment.link)
                    return (
                      <Link
                        className="text-brand hover:underline"
                        key={segment.text}
                        href={segment.link?.uri}
                      >
                        {segment.text}
                      </Link>
                    );

                  if (segment.isMention() && segment.mention?.did)
                    return (
                      <Link
                        className="text-brand hover:underline"
                        key={segment.text}
                        href={`https://bsky.app/profile/${segment.mention.did}`}
                      >
                        {segment.text}
                      </Link>
                    );

                  return segment.text.split("\n").map((textPart, idx, arr) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: safe for text
                    <React.Fragment key={`${textPart}-${idx}`}>
                      {textPart}
                      {idx < arr.length - 1 && <br />}
                    </React.Fragment>
                  ));
                })}
              </p>

              {externalEmbed && (
                <Link href={externalEmbed.uri} className="group hover:text-white" target="_blank">
                  <div className="flex flex-col rounded-lg border border-neutral-400 gap-1 text-sm">
                    <p className="px-2 pt-2 font-semibold">{externalEmbed.title}</p>
                    {externalEmbed.description && (
                      <p>{externalEmbed.description}</p>
                    )}
                    <span className="border-t bg-neutral-400/30 group-hover:text-brand border-neutral-400 pt-1 mt-1 pb-2 px-2 flex items-center gap-1">
                      {new URL(externalEmbed.uri).hostname}{" "}
                      <ExternalLink size={12} />
                    </span>
                  </div>
                </Link>
              )}
            </main>
          </article>
        );
      })}
    </div>
  );
}