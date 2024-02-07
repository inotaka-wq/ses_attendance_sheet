import { withIronSession } from "next-iron-session";
const dbConnect = require("./db-connect");

async function handler(req, res) {
  if (req.method === "GET") {
    // セッションからユーザー情報を取得
    const user = req.session.get("user");
    if (!user) {
      // ユーザーが認証されていない場合はエラーを返す
      return res.status(401).json({ message: "Unauthorized" });
    }
    const employeeId = user.userId;
    // データベースに接続
    const { db } = await dbConnect();
    const collection = db.collection("json_data"); // コレクション名

    // クエリパラメータから社員IDと月を取得
    // employeeIdいらん
    const { reportMonth } = req.query;
    console.log(req.query);

    // MongoDBで検索
    const result = await collection.findOne({ employeeId, reportMonth });

    if (result) {
      console.log(result);
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "No report found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withIronSession(handler, {
  cookieName: "login_info",
  password: "complex_password_at_least_32_characters_long",
  //  password: process.env.SESSION_SECRET, // 環境変数からセッション暗号化キーを取得
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});
