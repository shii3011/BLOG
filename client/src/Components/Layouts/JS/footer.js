import React from 'react';
import './../CSS/footer.css';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
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

export default Footer;

