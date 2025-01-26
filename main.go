package main

import (
	"html/template"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		tpl, _ := template.ParseFiles("./index.html")
		tpl.Execute(w, nil)
	})
	http.Handle("/app/", http.StripPrefix("/app", http.FileServer(http.Dir("./app"))))
	http.ListenAndServe(":8080", nil)
}
