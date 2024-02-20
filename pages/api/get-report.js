import { withSession } from "../../lib/session";
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

    // URLパラメータから社員IDと月を取得（自分以外のユーザーIDも許可）
    const { userId, reportMonth } = req.query;

    // マネージャーのみが他のユーザーの月報にアクセス可能
    if (user.role !== "manager" && user.userId !== userId) {
      return res.status(403).json({ message: "Access Denied" });
    }

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

export default withSession(handler);
