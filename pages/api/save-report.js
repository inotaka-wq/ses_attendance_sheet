const dbConnect = require('./db-connect');

export default async function handler(req, res) {
    // データベースに接続
    const { db } = await dbConnect();
    const collection = db.collection('json_data'); // コレクション名

    if (req.method === 'POST') {
      const draftData = req.body;
      console.log("Draft data received:", draftData);
      // 一意性を保証するためのクエリを作成
      const query = {
        employeeId: draftData.employeeId,
        reportMonth: draftData.reportMonth
      };
      // すでに同じキーのドキュメントがあるか確認
      const existingDocument = await collection.findOne(query);
      if (existingDocument) {
        // ドキュメントが存在する場合は更新
        await collection.updateOne(query, { $set: draftData });
        res.status(200).json({ message: 'Draft updated', _id: existingDocument._id });
      } else {
        // 新しいドキュメントを挿入
        const result = await collection.insertOne(draftData);
        res.status(200).json({ message: 'Draft saved', _id: result.insertedId });
      }
    } else {
      // POSTメソッド以外の場合は405 Method Not Allowedを返す
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  