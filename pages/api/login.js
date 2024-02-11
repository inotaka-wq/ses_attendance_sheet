import { withSession } from "../../lib/session";

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

export default withSession(loginRoute);