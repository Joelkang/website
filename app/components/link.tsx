import NextLink from "next/link";
import type { ComponentProps } from "react";
export function Link(props: ComponentProps<"a">) {
  const href = props.href;

  if (href?.startsWith("/")) {
    return (
      <NextLink href={href} {...props}>
        {props.children}
      </NextLink>
    );
  }

  if (href?.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}
