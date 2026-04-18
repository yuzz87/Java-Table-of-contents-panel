/**********/
/* type */
/**********/
export type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type Chat = {
  id: number;
  title: string;
  messages: Message[];
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export async function fetchChat(chatId: number): Promise<Chat> {
  const response = await fetch(`${API_BASE_URL}/api/chats/${chatId}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return ( await response.json()) as Chat;
}

export async function createMessage(chatId: number, content: string): Promise<Message>{
  const response = await fetch(`${API_BASE_URL}/api/chats/${chatId}/messages`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role: "user",
      content,
    }),
  });
  if (!response.ok){
    throw new Error(`Error status: ${response.status}`);
  }
  return (await response.json()) as Message;
}