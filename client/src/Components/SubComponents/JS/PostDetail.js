// pages/PostDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import './../CSS/PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await Axios.get(`http://localhost:3002/api/getPost/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div className="PostDetail-Loading">読み込み中...</div>;
  }

  return (
    <div className="PostDetail">
      <div className="PostDetail-Header">
        <h1 className="PostDetail-Title">{post.title}</h1>
        <div className="PostDetail-Info">
          <span>著者: {post.author}</span> | <span>投稿日: {new Date(post.createDateTime).toLocaleString()}</span>
        </div>
      </div>

      {post.thumbnail && (
        <div className="PostDetail-ImageWrapper">
          <img
            src={`data:image/jpeg;base64,${post.thumbnail}`}
            alt="サムネイル"
            className="PostDetail-Image"
          />
        </div>
      )}

      <div className="PostDetail-Content">
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default PostDetail;
