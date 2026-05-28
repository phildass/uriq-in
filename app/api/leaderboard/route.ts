import { NextResponse } from "next/server";
import { getBenchmarkMessage } from "@/lib/utils/benchmark";

export async function POST(request: Request) {
  const payload = await request.json();
  const percentile = Number(payload?.percentile ?? 50);

  return NextResponse.json({
    benchmark: getBenchmarkMessage(percentile),
  });
}
