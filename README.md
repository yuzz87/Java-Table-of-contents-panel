# Table of Contents Panel App

## 概要

長い文章や投稿一覧の中で、右側の目次パネルから目的の項目へすばやく移動できる UI を実装したアプリです。
frontend では React + TypeScript を使用し、backend では Spring Boot + MySQL を使用しています。
また、user メッセージを POST で追加すると、frontend の本文表示と目次パネルが同期して更新される構成になっています。

---

## 主な機能

- user メッセージ一覧の表示
- 目次パネル表示
- 目次クリックによる該当位置へのスクロール
- 現在位置に応じた目次項目の同期表示
- フッター入力欄からのuserメッセージ追加
- 投稿後の本文と目次の再取得・再表示

---

## 確認方法

### アプリ画面

- http://localhost:5173

### backend API 確認

- http://localhost:8080/api/chats/1

### 確認できること

- user メッセージ一覧が表示される
- 右側の目次パネルに user メッセージが表示される
- 目次をクリックすると該当位置へスクロールする
- 現在位置に応じて目次項目が同期して切り替わる
- フッターの入力欄から文章を追加すると、本文と目次の両方に反映される

---

## 環境構築

### 起動

```bash
docker compose up --build
```

### 停止

```bash
docker compose down
```

### DB を含めて初期化したい場合

```bash
docker compose down -v
docker compose up --build
```

---

## 使用技術

### Frontend

- React
- TypeScript

### Backend

- Java
- Spring Boot

### database

- MySQL

### Infra

- Docker
- Docker Compose

---

## Frontend

### API 通信

frontend では fetchChat() と createMessage() を作成し、backend API と通信しています。

- fetchChat() : チャット取得
- createMessage() : user メッセージ追加

### 目次パネル

目次パネルは、chat.messages から role === "user" のものだけを抽出して作成しています。
また、現在位置の判定には useActiveMessage を使用し、本文と目次パネルが同期するようにしています。

---

## Backend

backend では、チャットとメッセージを管理する API を作成しました。
主な役割は次のとおりです。

- チャットデータ取得
- メッセージ追加
- MySQL への保存
- frontend への JSON 返却
  また、循環参照による JSON の無限ネストが発生したため、Entity 側で参照ループを防ぐ修正も行いました。

---

## backend 構築メモ

### 1. Spring Initializr を使用

設計は次の内容で作成しました。

- Maven
- Java
- Spring Boot 3.5.13
- Group: com.example
- Artifact: chatapp
- Package name: com.example.chatapp
- Jar
- YAML
- Java 21

### 2. MySQL 接続設定

application.yml を使って、Spring Boot アプリの設定を管理しています。
主に次の内容を設定しています。

- server のポート番号
- MySQL の接続情報
- JPA / Hibernate の設定

#### jdbc とは

Java Database Connectivity の略で、Java からデータベースへ接続するための仕組みです。

#### Hibernate とは

Java のクラスとデータベースのテーブルを対応づける ORM の仕組みです。

### 3. Dockerfile

backend では Dockerfile を作成し、次の流れで実行します。

- Maven を使用して Java を build
- .jar ファイルを作成
- 作成した .jar を使って Spring Boot を実行

---

## 学び

- Spring Boot では、Entity / Repository / Controller に役割を分けると構造を整理しやすいこと
- JPA と Hibernate を使うことで、Java のクラスとデータベースのテーブルを対応づけて扱えること
- application.yml に接続情報やサーバー設定をまとめると、設定の管理がしやすくなること
- Repository を使うと、基本的な DB 操作を Spring Data JPA に任せやすくなること
- Entity 間の関連と JSON 返却を同時に扱う場合は、循環参照を意識して設計する必要があること

---

## 反省点

- JSON の循環参照で同じデータが大量表示される問題が起きた
- role: "User" と role: "user" の大文字小文字の違いで、目次に表示されない不具合が起きた
- 最初は assistant メッセージも含めた設計だったが、user のみを目次対象に調整し直した

---

## 今後行いたいこと

- 投稿後に新しい項目まで自動スクロールする
- 複数チャット対応にする
- 投稿の編集・削除機能を追加する
- モバイル画面に合わせたレスポンシブ対応を行う
