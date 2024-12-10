import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Conversation from "../components/Conversations";
import { GiConversation } from "react-icons/gi";
import MessageContainer from "../components/MessageContainer";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import { useMediaQuery } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messageAtom";
import userAtom from "../atoms/userAtom";
import { useSocket } from "../context/SocketContext";

const ChatPage = () => {
  const [searchingUser, setSearchingUser] = useState(false);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const { socket, onlineUsers } = useSocket();
  const [isLargerThan50Percent] = useMediaQuery("(min-width: 50rem)"); // Điều chỉnh giá trị "50rem" thành giá trị cụ thể theo yêu cầu
  // const otherUser = conversations.participants.find((p) =>p._id !== onlineUsers)
  const { t } = useTranslation();

  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if ((conversation._id = conversationId)) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });
    });
  }, [socket, setConversations]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setConversations(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingConversations(false);
      }
    };
    getConversation();
  }, [showToast, setConversations]);

  const handleConversationSearch = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      showToast("Error", "Please enter a username to search.", "error");
      return;
    }
    setSearchingUser(true);
    try {
      const res = await fetch(`/api/users/profile/${searchText.trim()}`);
      const searchedUser = await res.json();

      if (searchedUser.error) {
        showToast("Error", searchedUser.error, "error");
        return;
      }

      if (searchedUser._id === currentUser._id) {
        showToast("Error", "You cannot message yourself.", "error");
        return;
      }

      const existingConversation = conversations.find(
        (conversation) => conversation.participants[0]._id === searchedUser._id
      );

      if (existingConversation) {
        setSelectedConversation({
          _id: existingConversation._id,
          userId: searchedUser._id,
          username: searchedUser.username,
          userProfilePicture: searchedUser.profilePicture,
        });
      } else {
        const mockConversation = {
          mock: true,
          lastMessage: { text: "", sender: "" },
          _id: Date.now().toString(),
          participants: [
            {
              _id: searchedUser._id,
              username: searchedUser.username,
              profilePicture: searchedUser.profilePicture,
            },
          ],
        };
        setConversations((prev) => [...prev, mockConversation]);
      }
      setSearchText("");
    } catch (error) {
      showToast(
        "Error",
        error.message || "An unexpected error occurred.",
        "error"
      );
    } finally {
      setSearchingUser(false);
    }
  };

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{
        base: "100%",
        md: "80%",
        lg: "750px",
      }}
      p={4}
      transform={"translateX(-50%)"}
    >
      <Flex
        gap={4}
        flexDirection={{
          base: "column",
          md: "row",
        }}
        maxW={{
          sm: "440px",
          md: "full",
        }}
        mx={"auto"}
      >
        {isLargerThan50Percent && (
          <Flex
            flex={30}
            gap={2}
            flexDirection={"column"}
            maxW={{
              sm: "250px",
              mx: "auto",
            }}
            mx={"auto"}
          >
            <Text
              fontWeight={700}
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {t("yourconversation")}
            </Text>
            <form onSubmit={handleConversationSearch}>
              <Flex alignItems={"center"} gap={2}>
                <Input
                  placeholder={t("search")}
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                />
                <Button
                  size={"sm"}
                  onClick={handleConversationSearch}
                  isLoading={searchingUser}
                >
                  <SearchIcon />
                </Button>
              </Flex>
            </form>

            {loadingConversations &&
              [0, 1, 2, 3, 4].map((_, i) => (
                <Flex
                  key={i}
                  gap={4}
                  alignItems={"center"}
                  p={"1"}
                  borderRadius={"md"}
                >
                  <Box>
                    <SkeletonCircle size={10} />
                  </Box>
                  <Flex w={"full"} flexDirection={"column"} gap={3}>
                    <Skeleton h={"10px"} w={"80px"} />
                    <Skeleton h={"8px"} w={"90%"} />
                  </Flex>
                </Flex>
              ))}

            <Box
              maxH="450px" // Giới hạn chiều cao (tùy chỉnh theo ý bạn)
              overflowY="auto" // Thêm thanh cuộn dọc khi danh sách dài
            >
              {!loadingConversations &&
                conversations
                  .filter((conversation) => {
                    return conversation.participants.some(
                      (participant) => participant._id === currentUser._id
                    );
                  })
                  .map((conversation) => (
                    <Conversation
                      key={conversation._id}
                      isOnline={conversation.participants.some(
                        (participant) =>
                          participant._id !== currentUser._id &&
                          onlineUsers.includes(participant._id)
                      )}
                      conversation={conversation}
                    />
                  ))}
            </Box>
          </Flex>
        )}

        {!selectedConversation._id && (
          <Flex
            flex={70}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={100} />
            <Text fontSize={20}> {t("select")}</Text>
          </Flex>
        )}
        {selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>
  );
};

export default ChatPage;
