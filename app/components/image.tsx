import NextImage, { type ImageProps } from "next/image";

export function Image(props: ImageProps) {
  return <NextImage className="rounded-lg" {...props} />;
}