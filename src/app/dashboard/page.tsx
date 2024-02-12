"use client";

import React, { useState, useEffect } from "react";
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
    { employeeId: "001", employeeName: "山田 太郎", reportStatus: "提出済み", reportLink: "report-detail.html?employeeId=001&month=2023-07" },
    { employeeId: "002", employeeName: "鈴木 花子", reportStatus: "未提出", reportLink: "" },
    { employeeId: "003", employeeName: "佐藤 次郎", reportStatus: "提出済み", reportLink: "report-detail.html?employeeId=003&month=2023-07" },
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
      const monthOption = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - i, 1);
      const year = monthOption.getFullYear();
      const month = monthOption.getMonth() + 1;
      const value = `${year}-${month.toString().padStart(2, '0')}`;
      const label = `${year}年${month}月`;
      months.push({ value, label });
    }
    return months;
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
    // 月が変更された時の処理をここに記述
  };

  // スタイルを追加
  const getStatusStyle = (status) => {
    return status === "提出済み" ? styles.submitted : styles.notSubmitted;
  };

  return (
    <div className={styles.container}>
      <h1>月報管理</h1>
      <div className={styles.formGroup}>
        <label htmlFor="report-month">月報選択</label>
        <select id="report-month" value={selectedMonth} onChange={handleMonthChange}>
          {reportMonths.map(month => (
            <option key={month.value} value={month.value}>{month.label}</option>
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
              <td>{report.employeeId}</td>
              <td>{report.employeeName}</td>
              <td className={getStatusStyle(report.reportStatus)}>
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
  );
};

export default ManagerDashboard;
