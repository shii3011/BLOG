import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/';
import Footer from './Components/Footer/';
import Home from './pages/Home/';
import About from './pages/About/';
import Service from './pages/Service/';
import Company from './pages/Company/';
import Contact from './pages/Contact/';
import PostDetail from './Components/SubComponents/PostDetail/';

export default function App(){
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
  };
