'use client';
import { useEffect, useState } from 'react';

import Calendar from '../components/Calendar';
import styles from './Page.module.css';

const PASSWORD = 'bunny';

export default function Page() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedPassword = localStorage.getItem('protectedPassword');
    if (savedPassword === PASSWORD) {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (input === PASSWORD) {
      localStorage.setItem('protectedPassword', PASSWORD);
      setIsAuthorized(true);
    } else {
      alert('Incorrect password!');
      setInput('');
    }
  };

  if (isLoading) {
    return null;
  }

  if (!isAuthorized) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Enter Password to Access</h1>
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter password"
            style={{ padding: '8px', fontSize: '16px' }}
          />
          <button
            type="submit"
            style={{ padding: '8px 16px', marginLeft: '8px' }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Calendar />
    </div>
  );
}
