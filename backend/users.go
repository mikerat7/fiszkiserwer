package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
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

	_, err = db.Exec("INSERT INTO user (username, password, profilepic, email) VALUES (?, ?, ?, ?);", rq.Username, pswh, "", rq.Email)

	if err != nil {
		fmt.Println(err.Error())
		return c.NoContent(http.StatusBadRequest)
	}

	fmt.Println(pswh)
	return c.NoContent(http.StatusOK)
}
