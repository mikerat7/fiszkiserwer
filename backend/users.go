package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func signup(c echo.Context) error {
	rq := SignupUser{}
	err := c.Bind(&rq)

	if err != nil {
		// fmt.Println(err.Error())
		return c.NoContent(http.StatusBadRequest)
	}

	return c.NoContent(http.StatusOK)
}
