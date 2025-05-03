// Components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './../CSS/header.css';

class Header extends React.Component {
  render() {
    return (
      <div className='header' style={this.props.style}>
        <h1><Link to="/">NOTE BOOK</Link></h1>
        <nav className="pc-nav">
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
}

export default Header;
