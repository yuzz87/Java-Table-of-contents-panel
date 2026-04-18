# 確認方法(例)

- `http://localhost:8080`
- `http://localhost:5173`

# 環境構築

## frontend

- ReactとTypescriptを使用

---

## backend

1. `Spring Initializr`を使用

### 設計(Generate)

- Maven
- Java
- 3.5.13
- com.example
- com.example.chatapp
- Jar
- YAML
- 21

---

2. MYSQLへの導線を作成する

### application.ymlの記載

1. 記載する理由
   - Spring Bootアプリのメイン設定ファイルだから
2. server,mysqlの接続設定
   - Spring Boot アプリを、MySQL に接続して、8080番ポートで動かす
3. jdbc(Java Database Connectivity)とは？
   - JavaでDBにつなぐ方法
4. Hibernateとは？
   - Javaのクラスとデータベースのテーブルをつなぐための仕組み

---

3. Dockerfileの作成
   - Mavenを使用して、JavaをBuild
   - .jarファイルを使用して、実行

---

4. 動作確認を行う

### controllerに.javaを作成して、確認する

- `/controller/`がなければ作成
- `compose up -d --build`を行い確認する
