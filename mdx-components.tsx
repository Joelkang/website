import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils/styles";
import { Table } from "@/components/table";
import { Link } from "@/components/link";
import { Image } from "@/components/image";
import { Code } from "@/components/code";

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
        <a href={`#${slug}`} className="anchor">
          {children}
        </a>
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
  Image,
  a: Link,
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