const dbConnect = require('./db-connect');

export default async function handler(req, res) {
    // データベースに接続
    const { db } = await dbConnect();
    const collection = db.collection('json_data'); // コレクション名

    if (req.method === 'POST') {
      const reportData = req.body;
      console.log("Report data received:", reportData);
      // 一意性を保証するためのクエリを作成
      const query = {
        employeeId: reportData.employeeId,
        reportMonth: reportData.reportMonth
      };
      // すでに同じキーのドキュメントがあるか確認
      const existingDocument = await collection.findOne(query);
      if (reportData.isFinal) {
        if (existingDocument) {
          // レポートを確定
          await collection.updateOne(query, { $set: reportData });
          res.status(200).json({ message: 'Final report saved', _id: existingDocument.insertedId });

        } else {
          // 新しい確定レポートを挿入
          const result = await collection.insertOne(reportData);
          res.status(200).json({ message: 'Final report saved', _id: result.insertedId });
        }
      } else {
        // 下書きレポートの処理
        if (existingDocument) {
          // ドキュメントが存在する場合は更新
          await collection.updateOne(query, { $set: reportData });
          res.status(200).json({ message: 'Draft updated', _id: existingDocument._id });
        } else {
          // 新しいドキュメントを挿入
          const result = await collection.insertOne(reportData);
          res.status(200).json({ message: 'Draft saved', _id: result.insertedId });
        }
      }
    } else {
      // POSTメソッド以外の場合は405 Method Not Allowedを返す
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  