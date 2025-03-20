import { cn } from "@/lib/utils/styles";
import NextLink from "next/link";
import type { ComponentProps } from "react";
export function Link(props: ComponentProps<"a">) {
  const { href, className: _className, ...rest } = props;
  const className = cn("hover:text-brand", _className);

  if (href?.startsWith("/")) {
    return <NextLink href={href} className={className} {...rest} />;
  }

  if (href?.startsWith("#")) {
    return <a href={href} className={className} {...rest} />;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={className}
      {...rest}
    />
  );
}
