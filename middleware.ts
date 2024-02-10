import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// この関数はすべてのページリクエストに対して実行されます
export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 認証が不要なページのパスを指定
  if (pathname.includes('/login')) {
    return NextResponse.next();
  }

  // ここで認証状態をチェックする（例：セッションCookieを確認）
  // 仮に認証状態を示すセッションCookieが存在しないとします
  const userAuthenticated = request.cookies.get('login_info');

  // ユーザーが未認証の場合、ログインページにリダイレクト
  if (!userAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
