package models

type Post struct {
	ID             int    `json:"id"`
	Title          string `json:"title"`
	Content        string `json:"content"`
	Author         string `json:"author"`
	CreateDateTime string `json:"CreateDateTime"`
	Thumbnail      string `json:"thumbnail"`
}
