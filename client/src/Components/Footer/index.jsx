import React from 'react';
import styles from './footer.module.css';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
      <div className={styles.footer}>
        <h1><Link to="/">NOTE BOOK</Link></h1>
        <nav className={styles.pcnav}>
          <ul>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/service">SERVICE</Link></li>
            <li><Link to="/company">COMPANY</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
          </ul>
        </nav>
      </div>
    );
  }


