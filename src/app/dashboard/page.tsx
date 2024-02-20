"use client";

import React, { useState, useEffect } from "react";
import { logout } from "../../utils/auth";
import styles from "../../styles/style.module.css";

type MonthOption = {
  value: string;
  label: string;
};

const ManagerDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [reportMonths, setReportMonths] = useState<MonthOption[]>([]);

  // 月報データ用の状態（仮データ）
  const reports = [
    {
      userId:"yamada.taro",
      userName: "山田 太郎",
      reportStatus: "提出済み",
      reportLink: "report?userId=yamada.taro&month=2023-07",
    },
    {
      userId:"suzuki.hanako",
      userName: "鈴木 花子",
      reportStatus: "未提出",
      reportLink: "",
    },
    {
      userId:"sato.jiro",
      userName: "佐藤 次郎",
      reportStatus: "提出済み",
      reportLink: "report?userId=sato.jiro&month=2023-07",
    },
    {
      userId:"employee",
      userName: "田中 一郎",
      reportStatus: "提出済み",
      reportLink: "report?userId=employee&month=2023-07",
    },
  ];

  useEffect(() => {
    const months = generateMonthOptions();
    setReportMonths(months);
    setSelectedMonth(months[0]?.value); // 初期値を設定
  }, []);

  function generateMonthOptions() {
    const months = [];
    const currentMonth = new Date();
    for (let i = 0; i < 18; i++) {
      const monthOption = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - i,
        1
      );
      const year = monthOption.getFullYear();
      const month = monthOption.getMonth() + 1;
      const value = `${year}-${month.toString().padStart(2, "0")}`;
      const label = `${year}年${month}月`;
      months.push({ value, label });
    }
    return months;
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    // 月が変更された時の処理をここに記述
  };

  const handleLogoutClick = async () => {
    await logout(); // ログアウト処理を実行
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <title>月報管理</title>
      <div className={styles.container}>
        <h1>月報管理</h1>
        <div className={styles.logoutButtonContainer}>
          <button className={styles.logoutButton} onClick={handleLogoutClick}>
            ログアウト
          </button>
        </div>
        <div className="styles.user-info">
          <p id="user-name">
            ログインユーザ名: <span id="username" />
          </p>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="report-month">月報選択</label>
          <select
            id="report-month"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {reportMonths.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>社員ID</th>
              <th>社員名</th>
              <th>月報状況</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.userId}</td>
                <td>{report.userName}</td>
                <td>
                  {report.reportLink ? (
                    <a href={report.reportLink} className={styles.link}>
                      {report.reportStatus}
                    </a>
                  ) : (
                    report.reportStatus
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManagerDashboard;
