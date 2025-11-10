'use client';

import styles from './Page.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Page() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Meghna Mangat</h1>
          <nav className={styles.navigationBar}>
            <ul>
              <li><a href="#header">Home</a></li>
              <li><a href="#bio">About Me</a></li>
              <li><a href="#projects">Projects & Experience</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="bio" className={styles.section}>
        <div className={styles.container}>
          <h3>About Me</h3>
          <p>
            I'm currently undertaking a 13-month placement at ProspectSoft as a CS Technician. <br />
            In September I'll complete my final year of my BSc Computer Science degree at the University of Liverpool. <br />
            I'm on track to achieve a 2:1 in my degree. <br />
          </p>
        </div>
      </section>

      <section id="projects" className={styles.section2}>
        <div className={styles.container}>
          <h3>Projects & Experience</h3>
          <p>***Past projects that I've worked on will go here***</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="https://github.com/meghna-m" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} style={{ fontSize: '36px', color: 'white', paddingRight: '15px' }} />
        </Link>
        <Link href="https://www.linkedin.com/in/meghna-mangat/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '36px', color: 'white' }} />
        </Link>
        <br />
        ©2020 Meghna Mangat
      </footer>
      </div>
  );
}
