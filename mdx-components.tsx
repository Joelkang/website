import type { MDXComponents } from "mdx/types";
import Link from "next/link";

import type { ComponentProps } from "react";
import { highlight } from "sugar-high";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils/styles";

function Table({
  data,
}: {
  data: {
    headers: React.ReactNode[];
    rows: React.ReactNode[][];
  };
}) {
  const headers = data.headers.map((header, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: index is correct here
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: index is correct here
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: cellIndex is correct here
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: ComponentProps<"a">) {
  const href = props.href;

  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: ImageProps) {
  return <Image className="rounded-lg" {...props} />;
}

function Code({ children, ...props }) {
  const codeHTML = highlight(children);
  return (
    <code
      className="bg-neutral-900"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: wrapped in a code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...props}
    />
  );
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }) => {
    const slug = slugify(children);
    const Component = `h${level}` as "h1";

    return (
      <Component
        id={slug}
        className={cn({
          "text-8xl": level === 1,
          "text-6xl": level === 2,
          "text-4xl": level === 3,
          "text-2xl": level === 4,
          "text-xl": level === 5,
          "text-lg": level === 6,
        })}
      >
        <a href={`#${slug}`} className="anchor" />
        {children}
      </Component>
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

export const baseComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  p: ({ children }) => <p className="mb-4">{children}</p>,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...baseComponents,
    ...components,
  };
}