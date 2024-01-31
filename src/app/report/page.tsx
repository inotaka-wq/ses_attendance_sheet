  'use client';

  import React, { useState, useEffect } from 'react';
  import styles from '../../styles/style.module.css';

  type MonthOption = {
    value: string;
    label: string;
  };

  export default function ReportPage() {
    // ページに表示するデータの状態を管理するための状態フック
    const [reportMonths, setReportMonths] = useState<MonthOption[]>([]);
    // フォームが無効化されているかどうかを追跡するための状態
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    // チャット欄の表示状態を管理するための状態
    const [isChatVisible, setIsChatVisible] = useState(false);

    // コンポーネントがマウントされた後、月報のオプションを生成する
    useEffect(() => {
      const currentMonth = new Date();
      let months = [];
      for (let i = 0; i < 18; i++) {
        const monthOption = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - i, 1);
        const year = monthOption.getFullYear();
        // getMonth() は 0 から始まるので、1 を加算
        const month = (monthOption.getMonth() + 1).toString().padStart(2, '0'); // '01', '02', ..., '12'
        const monthValue = `${year}-${month}`; // 'YYYY-MM' 形式
        const monthLabel = monthOption.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });
        months.push({ value: monthValue, label: monthLabel });
      }
      setReportMonths(months);
    }, []);

    const employeeId = 'dummy'

    // フォームの各入力値を管理するための状態フック
    const [reportMonth, setReportMonth] = useState('');
    const [projectOverview, setProjectOverview] = useState('');
    const [monthlyAchievement, setMonthlyAchievement] = useState('');
    const [challenges, setChallenges] = useState('');
    const [difficulties, setDifficulties] = useState('');
    const [otherComments, setOtherComments] = useState('');
    const [principle1, setPrinciple1] = useState('');
    const [principle2, setPrinciple2] = useState('');
    const [principle3, setPrinciple3] = useState('');

    // 下書き保存ボタンのイベントハンドラ
    const saveDraft = async () => {
      // 例えば、フォームの状態をここで取得
      const formData = {
        employeeId,
        reportMonth,
        projectOverview,
        monthlyAchievement,
        challenges,
        difficulties,
        otherComments,
        principle1,
        principle2,
        principle3,
      };

      // バックエンドにデータを送信
      await fetch('/api/save-draft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      alert('下書きを保存しました。');
    };
    
    // レポートを送信するイベントハンドラ
    const submitReport = () => {
      if (window.confirm('月報を登録しますか？')) {
        setIsFormDisabled(true); // フォームを無効化
        setIsChatVisible(true); // チャット欄を表示
      }
    };

    // 月報選択が変更されたときのハンドラ
    const handleMonthChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedMonth = event.target.value;
      setReportMonth(selectedMonth);

      try {
        const response = await fetch(`/api/get-report?employeeId=${employeeId}&reportMonth=${selectedMonth}`);
        if (response.ok) {
          const data = await response.json();
          // ここで取得したデータを使ってフォームを更新
          // フォームの状態を更新
          setProjectOverview(data.projectOverview);
          setMonthlyAchievement(data.monthlyAchievement);
          setChallenges(data.challenges);
          setDifficulties(data.difficulties);
          setOtherComments(data.otherComments);
          setPrinciple1(data.principle1);
          setPrinciple2(data.principle2);
          setPrinciple3(data.principle3);
        } else {
          // レポートが見つからない場合の処理
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };

    return (
  <>
    <meta charSet="UTF-8" />
    <title>月報画面</title>
    <div className={styles.container}>
      <h1>月報</h1>
      <div className="styles.user-info">
        <p id="user-name">
          ログインユーザ名: <span id="username" />
        </p>
      </div>
      {/* 月報選択 */}
      <div className={styles.form_group}>
        <label htmlFor="report-month">月報選択</label>
        <select id="report-month"
        onChange={handleMonthChange} >
          {reportMonths.map(month => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>
      <form id="monthly-report-form">
        {/* プロジェクト概要 */}
        <div className={styles.form_group}>
          <label htmlFor="project-overview">プロジェクト概要</label>
          <textarea
            id="project-overview"
            rows={4}
            value={projectOverview}
            onChange={(e) => setProjectOverview(e.target.value)}
          />
          <p className={styles.note}>
            この項目は【第1開発_月報（閲覧用）】スペースに通知されます。
          </p>
        </div>
        {/* 1ヶ月を振り返った業務実績 */}
        <div className={styles.form_group}>
          <label htmlFor="monthly-achievement">1ヶ月を振り返った業務実績</label>
          <textarea
            id="monthly-achievement"
            rows={6}
            value={monthlyAchievement}
            onChange={(e) => setMonthlyAchievement(e.target.value)}/>
          <p className={styles.note}>
            この項目は【第1開発_月報（閲覧用）】スペースに通知されます。
          </p>
        </div>
        {/* 業務上で感じている自身の課題と対策 */}
        <div className={styles.form_group}>
          <label htmlFor="challenges">業務上で感じている自身の課題と対策</label>
          <textarea
            id="challenges"
            rows={4}
            value={challenges}
            onChange={(e) => setChallenges(e.target.value)}/>
          <p className={styles.note}>
            業務を通して不足している技術スキルやビジネススキルの克服策などを簡潔に書いてください。
          </p>
        </div>
        {/* 困っていること（業務） */}
        <div className={styles.form_group}>
          <label htmlFor="difficulties">困っていること（業務）</label>
          <textarea
            id="difficulties"
            rows={4}
            value={difficulties}
            onChange={(e) => setDifficulties(e.target.value)}/>
          <p className={styles.note}>
            営業や上長のサポートが必要な点などを簡潔に書きましょう。
          </p>
        </div>
        {/* その他 */}
        <div className={styles.form_group}>
          <label htmlFor="other-comments">その他</label>
          <textarea
            id="other-comments"
            rows={4}
            value={otherComments}
            onChange={(e) => setOtherComments(e.target.value)}/>
        </div>
        {/* 基本理念5箇条 */}
        <div className={styles.form_group}>
          <label htmlFor="principle1">基本理念5箇条の1</label>
          <input
            type="range"
            id="principle1"
            min={1}
            max={4}
            value={principle1}
            onChange={(e) => setPrinciple1(e.target.value)}/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="principle2">基本理念5箇条の2</label>
          <input
            type="range"
            id="principle2"
            min={1}
            max={4}
            value={principle2}
            onChange={(e) => setPrinciple2(e.target.value)}/>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="principle3">基本理念5箇条の3</label>
          <input
            type="range"
            id="principle3"
            min={1}
            max={4}
            value={principle3}
            onChange={(e) => setPrinciple3(e.target.value)}/>
        </div>
        {/* ボタン */}
        <button type="button" id="save-draft" className={styles.button} onClick={saveDraft}>
          下書き保存
        </button>
        <button type="button" id="submit-report" className={styles.button} disabled={isFormDisabled} onClick={submitReport}>
          登録
        </button>
      </form>
      {/* 上長・営業とのチャット欄 */}
      {isChatVisible && (
      <div
        className="manager-sales-chat"
        id="manager-sales-chat"
        style={{ display: "none" }}
      >
        <h2>上長・営業とのチャット</h2>
        <div className="chat-box" id="chat-box" />
        <input type="text" id="chat-input" placeholder="メッセージを入力" />
        <button onClick="{sendChat}">送信</button>
      </div>
      )}
    </div>
  </>
    );
  }

