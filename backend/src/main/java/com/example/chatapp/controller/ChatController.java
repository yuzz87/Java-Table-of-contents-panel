package com.example.chatapp.controller;

import com.example.chatapp.entity.Chat;
import com.example.chatapp.entity.Message;
import com.example.chatapp.repository.ChatRepository;
import com.example.chatapp.repository.MessageRepository;
import org.springframework.web.bind.annotation.*;//Web / Controller 用

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    private final ChatRepository chatRepository;// 初期化後は変更しない
    private final MessageRepository messageRepository;

    public ChatController(ChatRepository chatRepository, MessageRepository messageRepository) {
        this.chatRepository = chatRepository;
        this.messageRepository = messageRepository;
    }

    @GetMapping
    public List<Chat> findAll() {
        return chatRepository.findAll();
    }

    @GetMapping("/{id}")
    public Chat findById(@PathVariable Long id) {
        return chatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chat not found"));
    }

    @PostMapping("/{id}/messages")
    public Message addMessage(@PathVariable Long id, @RequestBody MessageRequest request) {
        Chat chat = chatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chat not found"));
        Message message = new Message();
        message.setRole(request.getRole());
        message.setContent(request.getContent());
        message.setChat(chat);

        chat.getMessages().add(message);
        return messageRepository.save(message);

    }
}