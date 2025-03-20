import { highlight } from "sugar-high";

export function Code({ children, ...props }) {
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