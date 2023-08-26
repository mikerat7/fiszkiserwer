package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var db *sql.DB

func loadSQLFile(path string) error {
	file, err := os.ReadFile(path)
	if err != nil {
		fmt.Println(err)
	}
	tx, err := db.Begin()
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		tx.Rollback()
	}()

	split_str := ""
	if strings.Contains(string(file), string(rune(13))) {
		split_str = ";" + string(rune(13)) + string(rune(10))
	} else {
		split_str = ";" + string(rune(10))
	}

	for _, q := range strings.Split(string(file), split_str) {
		q = strings.TrimSpace(q)
		if q == "" {
			continue
		}
		if _, err := tx.Exec(q); err != nil {
			// fmt.Println(q)
			// log.Fatal(err)
		}
	}

	fmt.Println("Successfully imported:", path)
	return tx.Commit()
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	db, err = sql.Open("mysql", os.Getenv("MARIADB_CONN"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	loadSQLFile("sql/FlasCards.sql")

	e := echo.New()
	e.Use(middleware.Recover(), middleware.Logger(), middleware.CORS(), middleware.RateLimiter(middleware.NewRateLimiterMemoryStore((20))))

	err = e.Start(":2137")
	if err != nil {
		log.Fatal(err)
	}
}
