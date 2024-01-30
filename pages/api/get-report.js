const { MongoClient } = require('mongodb');

// MongoDBへの接続設定
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await client.connect();
      const database = client.db('ses_attendance_sheet');
      const collection = database.collection('json_data');

      // クエリパラメータから社員IDと月を取得
      const { employeeId, reportMonth } = req.query;
      console.log(req.query);

      // MongoDBで検索
      const result = await collection.findOne({ employeeId, reportMonth });
      console.log(result);

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'No report found' });
      }
    } catch (e) {
      res.status(500).json({ message: 'Server error' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
