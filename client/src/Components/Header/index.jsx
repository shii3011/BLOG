// Components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

export default function Header(){
return (
      <div className = {styles.header}>
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

