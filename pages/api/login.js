// この例では、ユーザーIDとパスワードを直接比較しています。
// 実際のアプリケーションでは、ハッシュ化されたパスワードとデータベースに保存された情報の照合など、
// セキュアな認証処理を実装してください。

export default async function handler(req, res) {
    const { userId, password } = req.body;
    // 仮のユーザーデータベースシミュレーション
    const users = {
      "employee": { password: "employee123", role: "employee" },
      "manager": { password: "manager123", role: "manager" }
    };
  
    const user = users[userId];
  
    if (user && user.password === password) {
      // 認証成功
      res.status(200).json({ success: true, role: user.role, userId });
    } else {
      // 認証失敗
      res.status(401).json({ success: false, message: "認証に失敗しました。" });
    }
  }
  