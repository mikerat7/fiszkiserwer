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
	UserID int
	Token  string
}

type Authorise struct {
	Token string
}

type UserInfo struct {
	Username   string
	Profilepic string
}

type ChangePfp struct {
	Token string
	Data  string
}

type BaseInfo struct {
	Id   int
	Name string
}
