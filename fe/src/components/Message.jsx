import {
  Avatar,
  Box,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  conversationsAtom,
  messagesAtom,
  selectedConversationAtom,
} from "../atoms/messageAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import {BsCheck2All} from 'react-icons/bs'

const Message = ({ ownMessage, message, getMessages }) => {
  console.log("khang ", message)
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const setConversations = useSetRecoilState(conversationsAtom);

  const deleteMessClick = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this message!"))
        return;

      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      const updatedMessages = messages.filter((p) => p._id !== message._id);
      setMessages(updatedMessages);
      showToast("Success", "Message deleted", "success");

      if (updatedMessages.length > 0) {
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        setConversations((prevConvs) => {
          return prevConvs.map((conversation) => {
            if (conversation._id === selectedConversation._id) {
              return {
                ...conversation,
                lastMessage: {
                  text: lastMessage.text,
                  sender: lastMessage.sender,
                },
              };
            }
            return conversation;
          });
        });
      } else {
        setConversations((prevConvs) => {
          return prevConvs.map((conversation) => {
            if (conversation._id === selectedConversation._id) {
              return {
                ...conversation,
                lastMessage: null, 
              };
            }
            return conversation;
          });
        });
      }

      getMessages();
    } catch (error) {
      // showToast("Error", error.message, "error");
    }
  };

  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Popover placement="left">
            <PopoverTrigger>
              <Flex alignItems={"center"}>
                <IoIosMore />
              </Flex>
            </PopoverTrigger>
            <PopoverContent w={"fit-content"}>
              <Button
                size="sm"
                color="white"
                px={2}
                py={1}
                w={"fit-content"}
                onClick={deleteMessClick}
              >
                <FaRegTrashCan />
              </Button>
            </PopoverContent>
          </Popover>
          <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text color={"white"}>{message.text}</Text>
            <Box alignSelf={"flex-end"} ml={1} color={message?.seen ? "blue.400" : ""} fontWeight={"bold"}>
              <BsCheck2All size={16}/>
            </Box>
          </Flex>
          <Avatar src={currentUser.profilePicture} w={7} h={7} />{" "}
          {/* Use currentUser */}
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePicture} w={7} h={7} />
          <Text
            maxW={"350px"}
            bg={"gray.400"}
            p={1}
            borderRadius={"md"}
            color={"black"}
          >
            {message.text}
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
