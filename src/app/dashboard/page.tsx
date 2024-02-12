"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/style.module.css";

type MonthOption = {
  value: string;
  label: string;
};

const ManagerDashboard = () => {
  // 月報選択用の状態
  const [selectedMonth, setSelectedMonth] = useState("");
  // ページに表示するデータの状態を管理するための状態フック
  const [reportMonths, setReportMonths] = useState<MonthOption[]>([]);

  // 月報データ用の状態（仮データ）
  const reports = [
    { employeeId: "001", employeeName: "山田 太郎", reportStatus: "提出済み" },
    { employeeId: "002", employeeName: "鈴木 花子", reportStatus: "未提出" },
    { employeeId: "003", employeeName: "佐藤 次郎", reportStatus: "提出済み" },
  ];

  // コンポーネントがマウントされた後、月報のオプションを生成する
  useEffect(() => {
    const months = generateMonthOptions();
    setReportMonths(months);
    const initialMonth = `${months[0].value}`; // 最初のオプションを初期月として使用
    fetchAndSetReportData(initialMonth);
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
      const month = (monthOption.getMonth() + 1).toString().padStart(2, "0"); // '01', '02', ..., '12'
      const monthValue = `${year}-${month}`; // 'YYYY-MM' 形式
      const monthLabel = monthOption.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
      });
      months.push({ value: monthValue, label: monthLabel });
    }
    return months;
  }

  // 月報選択時の処理
  const handleMonthChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMonth(event.target.value);
    // ここで選択された月に応じて月報データをフェッチする処理を実装
  };

  const fetchAndSetReportData = async (selectedMonth: string) => {};

  return (
    <div className={styles.container}>
      <h1>月報管理</h1>
        {/* 月報選択 */}
        <div className={styles.form_group}>
          <label htmlFor="report-month">月報選択</label>
          <select id="report-month" onChange={handleMonthChange}>
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
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.employeeId}</td>
              <td>{report.employeeName}</td>
              <td>{report.reportStatus}</td>
              <td>
                {report.reportStatus === "提出済み" ? (
                  <a
                    href={`report-detail.html?employeeId=${report.employeeId}`}
                    className={styles.link}
                  >
                    詳細を見る
                  </a>
                ) : (
                  "ー"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;
