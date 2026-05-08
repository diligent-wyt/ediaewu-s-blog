import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LIKES_FILE = path.join(process.cwd(), "data", "likes.json");

function readLikes(): Record<string, number> {
  const raw = fs.readFileSync(LIKES_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeLikes(likes: Record<string, number>): void {
  fs.writeFileSync(LIKES_FILE, JSON.stringify(likes, null, 2) + "\n");
}

export async function GET() {
  const likes = readLikes();
  return NextResponse.json(likes);
}

export async function POST(request: Request) {
  const { slug, action } = await request.json();

  if (!slug || typeof slug !== "string") {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  const likes = readLikes();

  if (!(slug in likes)) {
    return NextResponse.json({ error: "post not found" }, { status: 404 });
  }

  if (action === "unlike") {
    likes[slug] = Math.max(0, likes[slug] - 1);
  } else {
    likes[slug] += 1;
  }
  writeLikes(likes);

  return NextResponse.json({ slug, likes: likes[slug] });
}
