const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const multer = require('multer'); // ★追加
const path = require('path');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'YaSuTaKa-0717',
  database: 'businessdb1',
});

app.use(cors());
// app.use(bodyParser.json());  → ★不要！（JSON用だから）
// ★追加ここ！
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// multerの設定（メモリ上にファイル保存）
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get("/api/get/category", (req, res) => {
  const sqlSelect = "SELECT * FROM posts";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

// データを更新するエンドポイント
app.post('/api/updateData', upload.fields([{ name: 'thumbnail', maxCount: 1 }]), (req, res) => {
  console.log('==== 新しいPOSTリクエスト ====');
  console.log('req.body:', req.body); // テキストデータ（title, content, author, createDateTime）
  console.log('req.files:', req.files); // ファイルデータ（thumbnail）

  const { title, content, author, createDateTime } = req.body;
  const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].buffer : null;

  const query = `
    INSERT INTO posts (title, content, author, createDateTime, thumbnail)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [title, content, author, createDateTime, thumbnail], (error, results, fields) => {
    if (error) {
      console.error('Error updating data:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log('Data updated successfully');
    res.send('Data updated successfully');
  });
});

app.get("/api/getPost/:id", (req, res) => {
  const id = req.params.id;
  const sqlSelect = "SELECT * FROM posts WHERE id = ?";
  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("サーバーエラー");
    } else {
      const post = result[0];
      if (post.thumbnail) {
        post.thumbnail = Buffer.from(post.thumbnail, 'binary').toString('base64'); 
      }
      res.send(post);
    }
  });
});


app.listen(3002, () => {
  console.log('running on port 3002');
});
