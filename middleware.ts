// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// middleware関数
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 認証したい対象パスだけ処理（例：/trainings）
  if (!pathname.startsWith("/trainings")) {
    return NextResponse.next();
  }

  const basicAuth = request.headers.get("authorization");

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pass] = atob(authValue).split(":");

    // 環境変数と照合（envファイル or Vercelの環境変数）
    if (
      user === process.env.BASIC_AUTH_USER &&
      pass === process.env.BASIC_AUTH_PASS
    ) {
      return NextResponse.next();
    }
  }

  // 認証失敗時のレスポンス
  return new NextResponse("認証が必要です", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected Area"',
    },
  });
}

// matcher でパスを絞ってもよい（オプション）
export const config = {
  matcher: ["/trainings/:path*"],
};
