const dbConnect = require("./db-connect");

export default async function handler(req, res) {
  if (req.method === "GET") {
    // データベースに接続
    const { db } = await dbConnect();
    const collection = db.collection("json_data"); // コレクション名

    // クエリパラメータから社員IDと月を取得
    const { employeeId, reportMonth } = req.query;
    console.log(req.query);

    // MongoDBで検索
    const result = await collection.findOne({ employeeId, reportMonth });

    if (result) {
      console.log(result);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No report found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
