// pages/Home.js
import React, { useState, useEffect } from "react";
import Axios from "axios";
import './../CSS/Home.css';
import SubArticleForm from '../../SubComponents/JS/SubArticleForm';
import ArticleCard from '../../SubComponents/JS/ArticleCard';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState(0); // 0: 新規、1: 修正
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;
  const navigate = useNavigate();

  // ページに応じて表示するデータを slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = categoryList.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(categoryList.length / itemsPerPage);

  // 新規フォームを開く
  const InsertForm = () => {
    setShowForm(true);
    setMode(0);
  };

  // 修正フォームを開く
  const UpdateForm = () => {
    setShowForm(true);
    setMode(1);
  };

  // フォームを閉じる
  const CloseForm = () => {
    setShowForm(false);
  };

  // アイテムをダブルクリックしたとき
  const handleItemDoubleClick = (item) => {
    setSelectedItem(item);
  };

  // データを取得する
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:3002/api/get/category");
        setCategoryList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [showForm]);  // ← showFormが変わったら再取得する

  return (
    <div className="Main">
      <div className = "ArticleCard-Container">
      {currentItems.map((val) => (
        <ArticleCard
          key={val.id}
          title={val.title}
          content={val.content}
          author={val.author}
          createDateTime={val.createDateTime}
          thumbnail={val.thumbnail}
          onClick={() => {
            handleItemDoubleClick(val);
            navigate(`/post/${val.id}`);
          }}
          onDoubleClick={showForm ? CloseForm : UpdateForm}
        />
      ))}
      </div>

      {/* 修正用サブ画面 */}
      {mode === 1 && showForm && selectedItem && (
        <SubArticleForm
          key={selectedItem.id}
          PTitle={selectedItem.title}
          PContent={selectedItem.content}
          PAuthor={selectedItem.author}
          PCreateDateTime={selectedItem.createDateTime}
          onClose={CloseForm}
        />
      )}



      {/* 新規サブ画面 */}
      <div className="open-form-btn" onClick={InsertForm}>
        <span>+</span>
        <div className={`article-form ${showForm ? 'open' : ''}`}>
          {mode === 0 && showForm && <SubArticleForm onClose={CloseForm} />}
        </div>
      </div>

      {/* ページネーションボタン */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          前へ
        </button>

        <span>{currentPage} / {totalPages}</span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          次へ
        </button>
      </div>
    </div>
  );
}

export default Home;
