package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/rand"
	"net/http"

	"github.com/labstack/echo/v4"
)

func hashPassword(password string) string {
	hashed_passwd := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hashed_passwd[:])
}
func signup(c echo.Context) error {
	rq := SignupUser{}
	err := c.Bind(&rq)

	if err != nil {
		// fmt.Println(err.Error())
		return c.NoContent(http.StatusBadRequest)
	}
	pswh := hashPassword(rq.Password)

	msg := 0

	err = db.QueryRow("SELECT userID FROM `user` WHERE username = ?;", rq.Username).Scan(&msg)

	if err == nil {
		fmt.Println(err.Error())
		return c.NoContent(http.StatusConflict)
	}
	_, err = db.Exec("INSERT INTO user (username, password, profilepic, email) VALUES (?, ?, ?, ?);", rq.Username, pswh, "", rq.Email)

	if err != nil {
		fmt.Println(err.Error())
		return err
	}

	fmt.Println(pswh)
	return c.NoContent(http.StatusOK)
}

func login(c echo.Context) error {

	rq := LoginUser{}
	err := c.Bind(&rq)
	if err != nil {
		fmt.Println(err.Error())
		return c.NoContent(http.StatusBadRequest)
	}
	pswh := hashPassword(rq.Password)

	id := 0
	err = db.QueryRow("SELECT userID FROM `user` WHERE username = ? AND password = ?;", rq.Username, pswh).Scan(&id)

	if err != nil {
		fmt.Println(err.Error())
		return c.NoContent(http.StatusConflict)
	}
	token := ""
	err = db.QueryRow("SELECT token FROM `usertoken` WHERE userID = ?;", id).Scan(&token)
	if err == nil {
		res := LoginResponse{}
		res.userID = id
		res.token = token
		return c.JSON(http.StatusAccepted, res)
	}
	for i := 0; i < 32; i++ {
		token += string(rune(rand.Intn(255)))
	}
	res := LoginResponse{}
	res.userID = id
	res.token = token
	_, err = db.Exec("INSERT INTO usertoken (userID, token) VALUES (?, ?);", id, token)
	return c.JSON(http.StatusAccepted, res)
}
