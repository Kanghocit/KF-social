import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import Message from "./Message";
import MessageInput from "./MessageInput";
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messageAtom";
import userAtom from "../atoms/userAtom";
import useFetchMessages from "../hooks/useFetchMessage.js";
import { useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext.jsx";

const MessageContainer = () => {
  const { socket } = useSocket();
  const showToast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const currentUser = useRecoilValue(userAtom);

  const { loadingMessages, messages, setMessages, getMessages } = useFetchMessages();
  const setConversations = useSetRecoilState(conversationsAtom);
  const messageEndRef = useRef(null);

  useEffect(() => {
    const lastMessageIsFromOtherUser =
      messages.length > 0 && messages[messages.length - 1].sender !== currentUser._id;

    if (lastMessageIsFromOtherUser) {
      socket.emit("markMessagesAsSeen", {
        conversationId: selectedConversation._id,
        userId: selectedConversation.userId,
      });
    }

    const messagesSeenHandler = ({ conversationId }) => {
      if (selectedConversation._id === conversationId) {
        setMessages((prev) =>
          prev.map((message) => ({
            ...message,
            seen: message.seen || true,
          }))
        );
      }
    };

    socket.on("messagesSeen", messagesSeenHandler);

    return () => {
      socket.off("messagesSeen", messagesSeenHandler);
    };
  }, [socket, currentUser._id, messages, selectedConversation, setMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const newMessageHandler = (message) => {
      if (selectedConversation._id === message.conversationId) {
        setMessages((prevMessage) => [...prevMessage, message]);
      }

      setConversations((prev) => {
        return prev.map((conversation) => {
          if (conversation._id === message.conversationId) {
            return {
              ...conversation,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            };
          }
          return conversation;
        });
      });
    };

    socket.on("newMessage", newMessageHandler);

    return () => socket.off("newMessage", newMessageHandler);
  }, [socket, selectedConversation, setConversations]);

  return (
    <Flex
      flex={70}
      bg={useColorModeValue("gray.200", "gray.dark")}
      p={2}
      borderRadius={"md"}
      flexDirection={"column"}
    >
      {/* Message Header */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src={selectedConversation.userProfilePicture} size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          {selectedConversation.username}{" "}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>

      <Divider />

      <Flex
        flexDir={"column"}
        gap={4}
        my={4}
        px={2}
        height={"400px"}
        overflowY={"auto"}
      >
        {loadingMessages &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}
        {!loadingMessages &&
          messages.map((message) => (
            <Flex
              key={message._id}
              ref={
                messages.length - 1 === messages.indexOf(message)
                  ? messageEndRef
                  : null
              }
              direction={"column"}
            >
              <Message
                message={message}
                ownMessage={currentUser._id === message.sender}
                getMessages={getMessages}
              />
            </Flex>
          ))}
      </Flex>
      <MessageInput setMessages={setMessages} />
    </Flex>
  );
};

export default MessageContainer;
