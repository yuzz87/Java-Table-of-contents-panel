package com.example.chatapp.repository;

import com.example.chatapp.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;//DB操作の基本機能
// 主キーの型 -> Long

public interface ChatRepository extends JpaRepository<Chat, Long> {
}