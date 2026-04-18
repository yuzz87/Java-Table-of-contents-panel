/**********/
/* import */
/**********/
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchChat, createMessage, type Chat } from "../api/api";
import TableOfContentsPanel from "../components/TocPanel";
import { useActiveMessage } from "../hooks/useActiveMessage";
import Header from "../components/Header";
import Main from "../components/Main";
import TocFooter from "../components/TocFooter";
import TocLayout from "../components/TocLayout";
import "../styles/TocLayout.css";

/**********/
/* export */
/**********/
export default function App() {
  /* const */
  const [chat, setChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [submit, setSubmit] = useState(false);

  // Panelから選択された要素
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // highlight解除用
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* 共通で使うデータ取得関数 */
  async function loadChat() {
    try {
      const data = await fetchChat(1);
      setChat(data);
      setError(null);
    } catch (err) {
      setError("データの取得に失敗しました");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /* useEffect */
  useEffect(() => {
    loadChat();
  }, []);

  useEffect(() => {
    return () => {
      if (clearTimerRef.current) {
        clearTimeout(clearTimerRef.current);
      }
    };
  }, []);

  async function handleSubmit() {
    if (!input.trim()) return;

    try {
      setSubmit(true);
      await createMessage(1, input);
      setInput("");
      await loadChat();
    } catch (err) {
      console.error(err);
      alert("送信に失敗しました");
    } finally {
      setSubmit(false);
    }
  }

  /* data */
  const tocItems = useMemo(() => {
    if (!chat) return [];

    return chat.messages
      .filter((message) => message.role === "user")
      .map((message) => ({
        id: message.id,
        targetId: `message-${message.id}`,
        label:
          message.content.length > 30
            ? message.content.slice(0, 30) + "..."
            : message.content,
      }));
  }, [chat]);

  const activeId = useActiveMessage(tocItems.map((item) => item.targetId));

  // Panelクリック時の同期処理
  const handleTocSelect = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    setSelectedId(targetId);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (clearTimerRef.current) {
      clearTimeout(clearTimerRef.current);
    }

    clearTimerRef.current = setTimeout(() => {
      setSelectedId(null);
    }, 1200);
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!chat) {
    return <div>チャットデータがありません</div>;
  }

  return (
    <TocLayout
      header={<Header title={chat.title} />}
      sidebar={
        <TableOfContentsPanel
          items={tocItems}
          activeId={selectedId ?? activeId}
          onItemClick={handleTocSelect}
        />
      }
      footer={
        <TocFooter
          input={input}
          submitting={submit}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />
      }
    >
      <Main>
        {chat.messages
          .filter((message) => message.role === "user")
          .map((message) => {
            const targetId = `message-${message.id}`;
            const isSelected = selectedId === targetId;
            const isActive = activeId === targetId;

            return (
              <div
                key={message.id}
                id={targetId}
                className={`message-block ${
                  isSelected ? "message-block-selected" : ""
                } ${isActive ? "message-block-active" : ""}`}
              >
                <div className="message-role">{message.role}</div>
                <div className="message-content">{message.content}</div>
              </div>
            );
          })}
      </Main>
    </TocLayout>
  );
}