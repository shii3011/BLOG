import React from 'react';
import './../CSS/ArticleCard.css';

function ArticleCard({ title, content, author, createDateTime, thumbnail, onClick, onDoubleClick }) {
  const getThumbnailSrc = () => {
    if (!thumbnail) return '';
    if (typeof thumbnail === 'object' && thumbnail.data) {
      const base64String = btoa(
        new Uint8Array(thumbnail.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      return `data:image/png;base64,${base64String}`;
    }
    return '';
  };

  return (
    <div className="card" onClick={onClick} onDoubleClick={onDoubleClick}>
      {/* 上部：サムネイル */}
      {thumbnail && (
        <div className="thumbnail-wrapper">
          <img src={getThumbnailSrc()} alt="Thumbnail" className="thumbnail-image" />
        </div>
      )}
      {/* 下部：テキスト */}
      <div className="card-body">
        <div className="title">
          {title}
        </div>
        <div className="content">
          {content}
        </div>
        <div className="author">
          {author}
        </div>
        <div className="meta">
          {new Date(createDateTime).toISOString().slice(0, 19).replace('T', ' ')}
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
