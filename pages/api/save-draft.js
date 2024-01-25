export default function handler(req, res) {
    if (req.method === 'POST') {
      const draftData = req.body;
      console.log("Draft data received:", draftData);
  
      // ここでデータを保存する処理を記述
      // 例: データベースへの保存、ファイルへの書き込みなど
  
      res.status(200).json({ message: 'Draft saved' });
    } else {
      // POSTメソッド以外の場合は405 Method Not Allowedを返す
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  