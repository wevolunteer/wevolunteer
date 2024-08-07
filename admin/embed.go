package admin

import "embed"

var (
	//go:embed dist/*
	AdminDistFS embed.FS
	//go:embed dist/index.html
	AdminIndexHTML embed.FS
)
