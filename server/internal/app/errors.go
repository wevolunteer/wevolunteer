package app

import "fmt"

type ErrNotAuthorized struct {
	Message string
}

func (e *ErrNotAuthorized) Error() string {
	return fmt.Sprintf("not authorized: %s", e.Message)
}

type ErrNotFound struct {
	Message string
}

func (e *ErrNotFound) Error() string {
	return fmt.Sprintf("not found: %s", e.Message)
}

type ErrBadInput struct {
	Message string
}

func (e *ErrBadInput) Error() string {
	return fmt.Sprintf("bad input: %s", e.Message)
}
