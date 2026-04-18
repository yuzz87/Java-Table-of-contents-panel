package com.example.chatapp;

import com.example.chatapp.entity.Chat;
import com.example.chatapp.entity.Message;
import com.example.chatapp.repository.ChatRepository;
import org.springframework.boot.CommandLineRunner;//起動直後に実行する
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final ChatRepository chatRepository;

    public DataLoader(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    @Override
    public void run(String... args) {
        // すでにデータがあるなら何もしない
        if (chatRepository.count() > 0) {
            return;
        }

        // Chatを1件作る
        Chat chat = new Chat();
        chat.setTitle("TOC");

        // Messageを追加する
        addMessage(chat, "user", "コンポーネント設計では、責務を分けて再利用しやすい構成にできることが重要です。");
        addMessage(chat, "user", "useState と useEffect を使い分けて、状態管理と副作用処理を適切に書ける必要があります。");
        addMessage(chat, "user", "props と state の違いを理解し、親子間で正しくデータを受け渡しできることが必要です。");
        addMessage(chat, "user", "フォーム制御では、入力値の管理とバリデーションの基本を押さえる必要があります。");
        addMessage(chat, "user", "条件分岐やリスト描画を使って、動的なUIを自然に実装できることが重要です。");
        addMessage(chat, "user", "key の意味を理解し、リスト描画で正しく指定できることが必要です。");
        addMessage(chat, "user", "Context API や状態管理ライブラリの基本を理解し、状態の共有方法を選べる必要があります。");
        addMessage(chat, "user", "React Router を使って、画面遷移やネストルーティングを実装できることが重要です。");
        addMessage(chat, "user", "API通信では、非同期処理とローディング・エラー処理を含めて実装できる必要があります。");
        addMessage(chat, "user", "パフォーマンス改善として、再レンダリングの仕組みと memo などの基本を理解することが大切です。");
        addMessage(chat, "user", "MVCの役割を理解し、モデル・ビュー・コントローラを適切に分けて設計できることが重要です。");
        addMessage(chat, "user", "Active Record を使って、CRUD処理や基本的なクエリを正しく書ける必要があります。");
        addMessage(chat, "user", "バリデーションを設定して、不正なデータを保存させない仕組みを理解することが必要です。");
        addMessage(chat, "user", "アソシエーションを理解し、1対多や多対多の関係を扱えることが重要です。");
        addMessage(chat, "user", "ルーティングを理解し、resources を中心にRESTfulに設計できる必要があります。");
        addMessage(chat, "user", "フォーム処理では、params の受け取りとストロングパラメータを正しく扱えることが必要です。");
        addMessage(chat, "user", "マイグレーションを使って、テーブル設計やカラム変更を安全に行えることが大切です。");
        addMessage(chat, "user", "認証と認可の基本を理解し、ログイン機能やアクセス制御を実装できる必要があります。");
        addMessage(chat, "user", "N+1問題や eager loading を理解し、基本的なパフォーマンス改善ができることが重要です。");
        addMessage(chat, "user", "RSpec や Minitest を使って、モデルやコントローラの基本的なテストを書けることが必要です。");
        // DBに保存する
        chatRepository.save(chat);
    }

    private void addMessage(Chat chat, String role, String content) {
        Message message = new Message();
        message.setRole(role);
        message.setContent(content);
        message.setChat(chat);

        chat.getMessages().add(message);
    }
}