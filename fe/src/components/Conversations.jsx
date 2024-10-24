import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  WrapItem
} from "@chakra-ui/react";
import React from "react";
import { BsCheck2All } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedConversationAtom
} from "../atoms/messageAtom";
import userAtom from "../atoms/userAtom";

const Conversations = ({ conversation, isOnline }) => {
  console.log(isOnline)

  const currentUser = useRecoilValue(userAtom);
  const otherUser = conversation.participants.find(
    (p) => p._id !== currentUser._id
  );
  const lastMessage = conversation.lastMessage || {}; // Sử dụng optional chaining

  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: otherUser?._id,
          userProfilePicture: otherUser?.profilePicture,
          username: otherUser?.username,
          mock: conversation.mock,
        })
      }
      bg={
        selectedConversation?._id === conversation._id
          ? useColorModeValue("gray.600", "gray.dark")
          : ""
      }
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{ base: "xs", sm: "sm", md: "md" }}
          src={otherUser?.profilePicture} // Sử dụng optional chaining
        >
          {isOnline ? <AvatarBadge boxSize={"1em"} bg={"green.500"} /> : ""}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          {otherUser?.username} {/* Sử dụng optional chaining */}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        {lastMessage?.text && ( // Kiểm tra tồn tại tin nhắn
          <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
            {currentUser._id === lastMessage.sender ? (
              <BsCheck2All size={16} />
            ) : (
              ""
            )}
            {lastMessage.text.length > 18
              ? lastMessage.text.substring(0, 18) + "...."
              : lastMessage.text}
          </Text>
        )}
      </Stack>
    </Flex>
  );
};

export default Conversations;
