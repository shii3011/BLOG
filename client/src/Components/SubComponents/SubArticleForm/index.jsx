import './SubArticleForm.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SubArticleForm( PTitle, PContent, PAuthor, PCreateDateTime, onClose ){
  const [title, setTitle] = useState(PTitle || '');
  const [content, setContent] = useState(PContent || '');
  const [author, setAuthor] = useState(PAuthor || '');
  const [createDateTime, setCreateDateTime] = useState(PCreateDateTime || '');
  const [thumbnail, setThumbnail] = useState(null); // ★追加！

  useEffect(() => {
    setTitle(PTitle || '');
    setContent(PContent || '');
    setAuthor(PAuthor || '');
    setCreateDateTime(PCreateDateTime || '');
  }, [PTitle, PContent, PAuthor, PCreateDateTime]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData(); // ★ファイルを送るためFormData使用！

      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('createDateTime', createDateTime);
      if (thumbnail) {
        formData.append('thumbnail', thumbnail); // ★サムネイルファイルを追加
      }

      await axios.post('http://localhost:3002/api/updateData', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // ★重要
        }
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
    onClose();
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCreateDateTime(new Date().toISOString().slice(0, 19).replace('T', ' '));
    }, 1000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="article-form-container" onClick={stopPropagation}>
      <form onSubmit={handleSubmit} onClick={stopPropagation}>
        <h1>登録画面</h1>
        <button type="reset" className='close' onClick={onClose}>✖</button>
        
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        {/* ★ここにファイル選択フォームを追加！ */}
        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
          accept="image/*"
        />

        <button type="submit" className='submit'>Submit</button>
      </form>
    </div>
  );
};

