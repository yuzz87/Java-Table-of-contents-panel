package com.example.chatapp.controller;//属する

// Spring BootでWeb APIを作るときによく使うアノテーションを使うための import

import org.springframework.web.bind.annotation.GetMapping; // GET REQ
import org.springframework.web.bind.annotation.RestController;// REST API

@RestController // REST API の Controller
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "Backend is running";
    }
}