const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
let cachedClient = null;
let cachedDb = null;

async function dbConnect() {
  if (cachedClient && cachedDb) {
    // キャッシュされたコネクションを返す
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db("ses_attendance_sheet");

  // 新しいコネクションをキャッシュする
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

module.exports = dbConnect;
