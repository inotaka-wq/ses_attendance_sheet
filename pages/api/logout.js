import { withSession } from "../../lib/session";

async function logoutRoute(req, res) {
  // セッションからユーザー情報を削除
  req.session.destroy();

  // ログアウト後にクライアントをログインページにリダイレクト
  res.status(200).json({ success: true, message: "ログアウトしました。" });
}

export default withSession(logoutRoute);