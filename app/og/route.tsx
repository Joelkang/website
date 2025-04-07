import { ImageResponse } from 'next/og'
import { GeistSans } from "geist/font/sans";

export const runtime = "edge";

export function GET(request: Request) {
  const url = new URL(request.url)
  const title = url.searchParams.get("title");
  const desc = url.searchParams.get("desc");

  return new ImageResponse(
    <div
      tw={`flex flex-col w-full h-full justify-between p-8 bg-black ${GeistSans.variable}`}
    >
      <div tw="flex flex-col ">
        <div tw="text-xl text-white font-semibold">Joel Kang</div>
        <div tw="text-sm text-white/40">
          Product Engineer × Context Cartographer
        </div>
      </div>
      <div tw="flex flex-col w-full justify-between mt-auto mb-12">
        <h2 tw="flex flex-col text-4xl font-bold tracking-tight text-left text-[#fdb05e]">
          {title}
        </h2>
        <div tw="text-white">{desc}</div>
      </div>
      <div tw="text-sm text-white/40">joelkang.com</div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
