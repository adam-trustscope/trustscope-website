import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // Gate disabled - allow all access
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
