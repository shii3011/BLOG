package main

import (
	"BLOG/models"
	"database/sql"
	"encoding/base64"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

func ifValid(ns sql.NullString) string {
	if ns.Valid {
		return ns.String
	}
	return ""
}

func main() {
	db, err := sql.Open("mysql", "root:YaSuTaKa-0717@tcp(localhost:3306)/businessdb1")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/api/get/category", func(c *gin.Context) {
		rows, err := db.Query("SELECT id, title, content, author, createDateTime, thumbnail FROM posts")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		var posts []models.Post

		for rows.Next() {
			var (
				id             int
				title          sql.NullString
				content        sql.NullString
				author         sql.NullString
				createDateRaw  sql.NullString
				thumbnailBytes []byte
			)

			err := rows.Scan(&id, &title, &content, &author, &createDateRaw, &thumbnailBytes)
			if err != nil {
				log.Println("row scan error:", err)
				continue
			}

			var formattedTime string
			if createDateRaw.Valid && createDateRaw.String != "" {
				parsedTime, err := time.Parse("2006-01-02 15:04:05", createDateRaw.String)
				if err != nil {
					log.Println("time parse error:", err)
					formattedTime = ""
				} else {
					formattedTime = parsedTime.Format(time.RFC3339)
				}
			}

			var thumbnailBase64 string
			if len(thumbnailBytes) > 0 {
				thumbnailBase64 = base64.StdEncoding.EncodeToString(thumbnailBytes)
			}

			p := models.Post{
				ID:             id,
				Title:          ifValid(title),
				Content:        ifValid(content),
				Author:         ifValid(author),
				CreateDateTime: formattedTime,
				Thumbnail:      thumbnailBase64,
			}

			posts = append(posts, p)
		}

		if posts == nil {
			posts = []models.Post{}
		}

		c.JSON(http.StatusOK, posts)
	})

	r.POST("/api/updateData", func(c *gin.Context) {
		title := c.PostForm("title")
		content := c.PostForm("content")
		author := c.PostForm("author")
		createDateTime := c.PostForm("createDateTime")

		var fileBytes []byte
		fileHeader, err := c.FormFile("thumbnail")
		if err == nil {
			file, err := fileHeader.Open()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to open file"})
				return
			}
			defer file.Close()

			fileBytes, err = io.ReadAll(file)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to read file"})
				return
			}
		}

		query := `INSERT INTO posts (title, content, author, createDateTime, thumbnail) VALUES (?, ?, ?, ?, ?)`
		_, err = db.Exec(query, title, content, author, createDateTime, fileBytes)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Data updated successfully"})
	})

	r.GET("/api/getPost/:id", func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
			return
		}
		var (
			title          sql.NullString
			content        sql.NullString
			author         sql.NullString
			createDateRaw  sql.NullString
			thumbnailBytes []byte
		)

		var post models.Post

		err = db.QueryRow("SELECT id, title, content, author, createDateTime, thumbnail FROM posts WHERE id = ?", id).
			Scan(&id, &title, &content, &author, &createDateRaw, &thumbnailBytes)
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
			return
		} else if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		var formattedTime string
		if createDateRaw.Valid && createDateRaw.String != "" {
			parsedTime, err := time.Parse("2006-01-02 15:04:05", createDateRaw.String)
			if err != nil {
				log.Println("time parse error:", err)
				formattedTime = ""
			} else {
				formattedTime = parsedTime.Format(time.RFC3339)
			}
		}

		var thumbnailBase64 string
		if len(thumbnailBytes) > 0 {
			thumbnailBase64 = base64.StdEncoding.EncodeToString(thumbnailBytes)
		}

		post = models.Post{
			ID:             id,
			Title:          ifValid(title),
			Content:        ifValid(content),
			Author:         ifValid(author),
			CreateDateTime: formattedTime,
			Thumbnail:      thumbnailBase64,
		}

		c.JSON(http.StatusOK, post)
	})

	fmt.Println("starting server on port 3002...")
	if err := r.Run(":3002"); err != nil {
		log.Fatalf("server failed to start: %v", err)
	}
}
