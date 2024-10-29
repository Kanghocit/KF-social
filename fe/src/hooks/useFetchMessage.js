import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedConversationAtom, messagesAtom } from "../atoms/messageAtom";
import useShowToast from "./useShowToast";

const useFetchMessages = () => {
  const showToast = useShowToast();
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useRecoilState(messagesAtom); // Recoil to manage messages
  const selectedConversation = useRecoilValue(selectedConversationAtom);

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true);
      setMessages([]);
      try {
        if (selectedConversation.mock) return;
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setMessages(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingMessages(false);
      }
    };
    getMessages();
  }, [
    showToast,
    selectedConversation.userId,
    selectedConversation.mock,
    setMessages,
  ]);

  return { loadingMessages, messages, setMessages };
};

export default useFetchMessages;
