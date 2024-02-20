const bcrypt = require("bcrypt");
//const { MongoClient } = require('mongodb');
const dbConnect = require("./db-connect");

// const uri = "mongodb_connection_string"; // MongoDBの接続文字列
// const client = new MongoClient(uri);

// ユーザーデータとパスワード
const users = [
  {
    userId: "yamada.taro",
    userName: "山田 太郎",
    password: "password123",
    role: "employee",
  },
  {
    userId: "suzuki.hanako",
    userName: "鈴木 花子",
    password: "password456",
    role: "employee",
  },
  {
    userId: "manager",
    userName: "佐藤 次郎",
    password: "manager789",
    role: "manager",
  },
  {
    userId: "employee",
    userName: "田中 一郎",
    password: "employee101",
    role: "employee",
  },
];

async function insertUsersWithHashedPassword(users) {
  const { db } = await dbConnect();
  const collection = db.collection("usr"); // コレクション名

  for (const user of users) {
    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // ハッシュ化されたパスワードでユーザーデータを更新
    const userWithHashedPassword = {
      userId: user.userId,
      userName: user.userName,
      password: hashedPassword, // 平文パスワードをハッシュ化したものに置き換え
      role: user.role,
    };
    // ユーザーをデータベースに挿入
    await collection.insertOne(userWithHashedPassword);
  }

  console.log("All users inserted with hashed passwords.");
}

insertUsersWithHashedPassword(users);
