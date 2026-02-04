//
// Copyright (C) 2025 veypi <i@veypi.com>
// 2025-03-04 14:03:56
// Distributed under terms of the MIT license.
//

package vhtmlui

import (
	"embed"

	"github.com/veypi/vigo"
	"github.com/veypi/vigo/contrib/doc"
	"github.com/veypi/vigo/contrib/vhtml"
)

var Router = vigo.NewRouter()

//go:embed ui/*
var uifs embed.FS

//go:embed ui/root.html
var rootFile []byte

//go:embed ui/*.md ui/**/*.md
var mdFiles embed.FS

func init() {
	doc.New(Router.SubRouter("docs"), mdFiles, "ui")
	vhtml.WrapUI(Router, uifs)
}
