async function logout() {
    const res = await fetch("/api/logout", { method: "POST" });
    if (res.ok) {
      // ログアウト成功時の処理
      window.location.href = "/login";
    } else {
      // ログアウト失敗時の処理
      alert("ログアウトに失敗しました。");
    }
  }
  
export { logout };