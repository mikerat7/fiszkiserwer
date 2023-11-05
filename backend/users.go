package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"

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
		return c.NoContent(http.StatusNotFound)
	}
	token := ""
	err = db.QueryRow("SELECT token FROM `usertoken` WHERE userID = ?;", id).Scan(&token)
	if err == nil {
		res := LoginResponse{id, token}
		res.UserID = id
		res.Token = token
		return c.JSON(http.StatusAccepted, res)
	}
	for i := 0; i < 32; i++ {
		token += string(rune(rand.Intn(9) + 48))
	}
	res := LoginResponse{}
	res.UserID = id
	res.Token = token
	_, err = db.Exec("INSERT INTO usertoken (userID, token) VALUES (?, ?);", id, token)
	return c.JSON(http.StatusAccepted, res)
}

func authorise(token string) int {
	id := 0

	err := db.QueryRow("SELECT userID FROM `usertoken` WHERE token = ?", token).Scan(&id)

	if err != nil {
		return -1
	}

	return id
}

func logout(c echo.Context) error {
	rq := Authorise{}
	c.Bind(&rq)
	id := authorise(rq.Token)
	if id == -1 {
		return c.NoContent(http.StatusForbidden)
	}

	_, err := db.Exec("DELETE FROM `usertoken` WHERE userID = ?", id)
	if err != nil {
		fmt.Println(err)
		return err
	}

	return c.NoContent(http.StatusOK)
}

func GetUserInfo(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		return c.NoContent(http.StatusBadRequest)
	}

	info := UserInfo{}

	err = db.QueryRow("SELECT username, profilepic FROM user WHERE userID = ?", id).Scan(&info.Username, &info.Profilepic)

	if err != nil {
		return c.NoContent(http.StatusNotFound)
	}

	return c.JSON(http.StatusOK, info)
}
