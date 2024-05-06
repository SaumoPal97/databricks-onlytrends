import { useState } from "react";
import PropTypes from "prop-types";
import { scrollToBottom, initialMessages, getSources } from "@/lib/chatUtils";
import ChatLine from "./ChatLine";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useRef } from "react";
import { API_URL } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

const ChatPage = ({ title = null, namespace = null }) => {
  const containerRef = useRef(null);
  const [messages, setMessages] = useState([...initialMessages(title)]);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (title) {
      setMessages([...initialMessages(title)]);
    }
  }, [title]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessages((prevState) => [
      ...prevState,
      ...[{ role: "user", id: uuidv4(), content: input }],
    ]);
  };

  useEffect(() => {
    const getChatResponse = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${API_URL}/chat/${namespace ? `${namespace}/` : ""}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages,
          }),
        }
      );
      const res = await response.json();
      setMessages((prevState) => [
        ...prevState,
        { role: "assistant", id: uuidv4(), content: res.result },
      ]);
      setData(res.sources);
      setIsLoading(false);
      setInput("");
    };
    if (messages.length > 0 && messages[messages.length - 1].role == "user") {
      getChatResponse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  return (
    <>
      <div className="rounded-2xl border min-h-full max-h-full w-full flex flex-col justify-between pt-10">
        <div className="p-6 overflow-auto" ref={containerRef}>
          {(messages || []).map(({ id, role, content }, index) => (
            <ChatLine
              key={id}
              role={role}
              content={content}
              // Start from the third message of the assistant
              sources={data?.length ? getSources(data, role, index) : []}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex clear-both">
          <Input
            value={input}
            placeholder={"Type to chat with AI..."}
            onChange={handleInputChange}
            className="mr-2"
          />

          <Button type="submit" className="w-24">
            {isLoading ? <Spinner /> : "Ask"}
          </Button>
        </form>
      </div>
    </>
  );
};

ChatPage.propTypes = {
  title: PropTypes.string,
  namespace: PropTypes.string,
};

export default ChatPage;
