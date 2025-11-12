import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '../../firebase/firebase';
import styles from './Calendar.module.css';

export default function Calendar() {
  const [year, setYear] = useState(2025);

  const [month, setMonth] = useState(new Date().getMonth());
  const [checkedDays, setCheckedDays] = useState<Record<number, string>>({});

  const userId = 'jerry';

  const key = `${year}-${String(month + 1).padStart(2, '0')}`;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const firstDayOfWeek = (new Date(year, month, 1).getDay() + 6) % 7;

  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'user', userId, 'calendar', key);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCheckedDays(docSnap.data().days || {});
        } else {
          setCheckedDays({});
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [key, userId]);

  const toggleDay = async (day: number) => {
    let updated = { ...checkedDays };

    if (updated[day] === 'active') {
      updated[day] = 'inactive';
    } else if (updated[day] === 'inactive') {
      delete updated[day];
    } else {
      updated[day] = 'active';
    }

    setCheckedDays(updated);

    try {
      const docRef = doc(db, 'user', userId, 'calendar', key);
      await setDoc(docRef, { days: updated });
    } catch (error) {
      console.error('Error saving data:', error);
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
  const tickedCount = Object.values(checkedDays).filter(
    (state) => state === 'active'
  ).length;
  const targetDays = Math.ceil((goalPercent / 100) * totalDays);
  const currentProgress = Math.round((tickedCount / targetDays) * 100);
  const remainingToGoal = Math.max(0, targetDays - tickedCount);

  const yearGoalPercent = 80;
  const yearTotalDays = Array.from({ length: 12 }, (_, i) =>
    new Date(year, i + 1, 0).getDate()
  ).reduce((a, b) => a + b, 0);
  const yearTickedCount = Object.values(checkedDays).filter(
    (state) => state === 'active'
  ).length;
  const yearTargetDays = Math.ceil((yearGoalPercent / 100) * yearTotalDays);
  const yearCurrentProgress = Math.round(
    (yearTickedCount / yearTargetDays) * 100
  );
  const yearRemainingToGoal = Math.max(0, yearTargetDays - yearTickedCount);

  return (
    <div>
      <div className={styles.calendarContainer}>
        <h2 className={styles.header}>
          {new Date(year, month).toLocaleString('default', { month: 'long' })}{' '}
          {year}
        </h2>

        <div className={styles.navigationButtons}>
          <button className={styles.navButton} onClick={prevMonth}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className={styles.navButton} onClick={nextMonth}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className={styles.weekdaysRow}>
          {weekdays.map((weekday, index) => (
            <div key={index} className={styles.weekday}>
              {weekday}
            </div>
          ))}
        </div>

        <div className={styles.daysGrid}>
          {/* Empty boxes before 1st day */}
          {emptyDays.map((_, i) => (
            <div key={`empty-${i}`} className={styles.emptyDay}></div>
          ))}

          {/* Actual days */}
          {daysArray.map((day) => {
            const state = checkedDays[day];
            const isActive = state === 'active';
            const isInactive = state === 'inactive';

            return (
              <motion.div
                key={day}
                onClick={() => toggleDay(day)}
                initial={false}
                animate={{
                  scale: isActive ? 1 : isInactive ? 0.95 : 1,
                  backgroundColor: isActive
                    ? 'rgb(72, 187, 120)'
                    : isInactive
                      ? 'rgb(245, 101, 101)'
                      : 'rgb(255, 255, 255)',
                  color: isActive || isInactive ? '#fff' : '#000',
                  boxShadow: isActive
                    ? '0 0 8px rgba(72, 187, 120, 0.6)'
                    : isInactive
                      ? '0 0 8px rgba(245, 101, 101, 0.5)'
                      : 'none',
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`${styles.day} ${
                  isActive
                    ? styles.activeDay
                    : isInactive
                      ? styles.inactiveDay
                      : ''
                }`}
              >
                {day}
              </motion.div>
            );
          })}
        </div>
      </div>
      <div>
        <div className={styles.statsBox}>
          <h4 className={styles.statsTitle}> Monthly Summary</h4>
          <div className={styles.statsRow}>
            <div className={styles.statsCol}>
              <p className={styles.statsText}>{goalPercent}%</p>
              <p className={styles.statsDescription}>Goal</p>
            </div>

            <div className={styles.statsCol}>
              <p className={styles.statsText}>{currentProgress}%</p>
              <p className={styles.statsDescription}>Active %</p>
            </div>

            <div className={styles.statsCol}>
              <p className={styles.statsText}>{remainingToGoal}</p>
              <p className={styles.statsDescription}>Remaining Days</p>
            </div>
          </div>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${
                currentProgress >= goalPercent ? styles.goalReached : ''
              }`}
              style={{ width: `${currentProgress}%` }}
            />
          </div>
        </div>
      </div>
      <div>
        <div className={styles.statsBox}>
          <h4 className={styles.statsTitle}> Year-to-Date Summary</h4>
          <div className={styles.statsRow}>
            <div className={styles.statsCol}>
              <p className={styles.statsText}>{yearGoalPercent}%</p>
              <p className={styles.statsDescription}>Goal</p>
            </div>

            <div className={styles.statsCol}>
              <p className={styles.statsText}>{yearCurrentProgress}%</p>
              <p className={styles.statsDescription}>Active %</p>
            </div>

            <div className={styles.statsCol}>
              <p className={styles.statsText}>{yearRemainingToGoal}</p>
              <p className={styles.statsDescription}>Remaining Days</p>
            </div>
          </div>
          <div className={styles.progressBar}>
            <div
              className={`${styles.progressFill} ${
                yearCurrentProgress >= yearGoalPercent ? styles.goalReached : ''
              }`}
              style={{ width: `${yearCurrentProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
