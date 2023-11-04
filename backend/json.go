package main

type SignupUser struct {
	Username string
	Email    string
	Password string
}

type LoginUser struct {
	Username string
	Password string
}

type LoginResponse struct {
	userID int
	token  string
}

type Authorise struct {
	token string
}
