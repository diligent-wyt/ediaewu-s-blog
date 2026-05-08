import { generateFeedXml } from "@/lib/rss";

export async function GET() {
  const xml = generateFeedXml();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
