import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Layouts/JS/header';
import Footer from './Components/Layouts/JS/footer';
import Home from './Components/pages/JS/Home';
import About from './Components/pages/JS/About';
import Service from './Components/pages/JS/Service';
import Company from './Components/pages/JS/Company';
import Contact from './Components/pages/JS/Contact';
import PostDetail from './Components/SubComponents/JS/PostDetail';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Header className='header'/>

          <div className='main'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/service" element={<Service />} />
              <Route path="/company" element={<Company />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
          </div>

          <Footer className = 'footer'/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
