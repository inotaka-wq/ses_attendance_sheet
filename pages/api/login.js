import { withIronSession } from "next-iron-session";

async function loginRoute(req, res) {
  const { userId, password } = req.body;
  // 仮のユーザーデータベースシミュレーション
  const users = {
    employee: { password: "employee123", role: "employee" },
    manager: { password: "manager123", role: "manager" },
  };

  const user = users[userId];

  if (user && user.password === password) {
    // 認証成功時、ユーザー情報をセッションに保存
    req.session.set("user", { userId, role: user.role });
    await req.session.save();
    res.status(200).json({ success: true, role: user.role });
  } else {
    // 認証失敗
    res.status(401).json({ success: false, message: "認証に失敗しました。" });
  }
}

export default withIronSession(loginRoute, {
  cookieName: "login_info", // クッキー名を適切に設定
  password: "complex_password_at_least_32_characters_long", // 長く複雑なパスワードを設定
  //  password: process.env.SESSION_SECRET, // 環境変数からセッション暗号化キーを取得
  // セキュリティ設定など、必要に応じて他のオプションをここに追加
  cookieOptions: {
    secure: process.env.NODE_ENV === "production", // 本番環境ではHTTPSを使用
    maxAge: 3 * 60 * 60 // 3H
  },
});
