const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
    const uri = "mongodb://localhost:27017"; // MongoDBのURI
    const client = new MongoClient(uri);

    try{
      await client.connect();
      console.log("Connected successfully to MongoDB");
      const database = client.db('ses_attendance_sheet'); // データベース名
      const collection = database.collection('json_data'); // コレクション名

      if (req.method === 'POST') {
        const draftData = req.body;
        console.log("Draft data received:", draftData);
    
        // ここでデータを保存する処理を記述
        // 例: データベースへの保存、ファイルへの書き込みなど
        // データベースにデータを挿入
        const result = await collection.insertOne(draftData);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
  
        res.status(200).json({ message: 'Draft saved', _id: result.insertedId });
      } else {
        // POSTメソッド以外の場合は405 Method Not Allowedを返す
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    } finally {
      await client.close();
    }
  }
  