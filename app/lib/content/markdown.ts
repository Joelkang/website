
"use server";
import fs from "node:fs";
import path from "node:path";
import { evaluate } from "@mdx-js/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import type { FC } from "react";
import type { ArticleMeta } from "./articles";
const POSTS_DIR = "app/lib/content";

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

async function readMDXFile(dir: string, file: string) {
  const fullPath = `${dir}/${file}`;
  const rawContent = fs.readFileSync(fullPath, "utf-8");
  const frontmatter = await extractMdFrontmatter(rawContent);
  const slug = file.replace(path.extname(file), "");
  return {
    ...frontmatter,
    type: "mdx",
    id: fullPath,
    slug,
    url: `/waypoints/${slug}`,
  };
}

async function extractMdFrontmatter(rawContent: string) {
  const { frontmatter } = await evaluate(rawContent, {
    Fragment: "none",
    jsx: () => "",
    jsxs: () => "",
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  });
  return frontmatter as ArticleMeta;
}

export async function listMdxPosts() {
  const absDir = path.join(process.cwd(), POSTS_DIR);
  const files = getMDXFiles(absDir);
  const promises = await Promise.allSettled(
    files.map((file) => readMDXFile(absDir, file)),
  );
  return promises
    .map((promise) => {
      if (promise.status === "rejected") {
        console.error(promise.reason);
        return null;
      }
      return promise.value;
    })
    .filter((meta) => !!meta);
}

export async function importMdxPost(slug: string) {
  try {
    const promise: { default: FC; frontmatter: ArticleMeta } = await import(
      `${POSTS_DIR}/${slug}.mdx`
    );
    const { default: Post, frontmatter } = promise;
    return { Post, metadata: frontmatter };
  } catch (e) {
    return null;
  }
}
