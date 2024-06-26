package main

import (
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
)

func GetLanguage(c echo.Context) error {

	info := []BaseInfo{}

	rows, err := db.Query("SELECT `languageid`, `languagename` FROM `language` WHERE 1;")

	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	// Loop through the first result set.
	for rows.Next() {
		// Handle result set.
		infoEntry := BaseInfo{}
		rows.Scan(&infoEntry.Id, &infoEntry.Name)
		info = append(info, infoEntry)
	}
	return c.JSON(http.StatusOK, info)

}
