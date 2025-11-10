import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import styles from "./Calendar.module.css";

export default function Calendar() {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(new Date().getMonth());
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const userId = "jerry"

  const key = `${year}-${String(month + 1).padStart(2, "0")}`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "user", userId, "calendar", key);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCheckedDays(docSnap.data().days || []);
        } else {
          setCheckedDays([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [key, userId]);

  const toggleDay = async (day: number) => {
    const updated = checkedDays.includes(day)
      ? checkedDays.filter((d) => d !== day)
      : [...checkedDays, day];

    setCheckedDays(updated);

    try {
      const docRef = doc(db, "user", userId, "calendar", key);
      await setDoc(docRef, { days: updated });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const nextMonth = () => {
    setMonth((prev) => (prev + 1) % 12);
    if (month === 11) setYear((prev) => prev + 1);
  };

  const prevMonth = () => {
    setMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (month === 0) setYear((prev) => prev - 1);
  };

  const goalPercent = 80;
  const totalDays = daysInMonth;
  const tickedCount = checkedDays.length;
  const targetDays = Math.ceil((goalPercent / 100) * totalDays);
  const currentProgress = Math.round((tickedCount / targetDays) * 100);
  const remainingToGoal = Math.max(0, targetDays - tickedCount);

  return (
    <div>
    <div className={styles.calendarContainer}>
      <h2 className={styles.header}>
        {new Date(year, month).toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className={styles.navigationButtons}>
        <button className={styles.navButton} onClick={prevMonth}>
          &#9664;
        </button>
        <button className={styles.navButton} onClick={nextMonth}>
          &#9654;
        </button>
      </div>

      <div className={styles.daysGrid}>
        {daysArray.map((day) => (
          <div
            key={day}
            onClick={() => toggleDay(day)}
            className={`${styles.day} ${
              checkedDays.includes(day) ? styles.checkedDay : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
    <div>
    <div className={styles.statsBox}>
        <div  className={styles.statsTitle}><div>📊 Monthly Stats</div>          <div>🎯 <strong>Goal:</strong> {goalPercent}%</div>
        </div>
        <div className={styles.statsRow}>
          <div>✅ <strong>Progress:</strong> {currentProgress}%</div>
          <div>📆 <strong>Days to goal:</strong> {remainingToGoal}</div>
        </div>
        <div className={styles.progressBar}>
          <div
            className={`${styles.progressFill} ${
              currentProgress >= goalPercent ? styles.goalReached : ""
            }`}
            style={{ width: `${currentProgress}%` }}
          />
        </div>
      </div>
    </div>
    </div>
  );
}
