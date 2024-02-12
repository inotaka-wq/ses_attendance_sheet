"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/style.module.css";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, password }),
    });
    if (res.ok) {
      const { role } = await res.json();
      if (role === "employee") {
        router.push(`/report`);
      } else {
        // 管理画面にリダイレクト
        router.push("/dashboard");
      }
    } else {
      alert("ログインに失敗しました。");
    }
  };

  return (
    <div className={styles.container}>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="userId">ユーザーID</label>
          <input
            id="userId"
            type="text"
            className={styles.input}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          ログイン
        </button>
      </form>
    </div>
  );
}
