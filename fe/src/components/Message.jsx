import {
  Avatar,
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

const Message = ({ ownMessage, message, getMessages }) => { 
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
  
      // Cập nhật danh sách tin nhắn
      const updatedMessages = messages.filter((p) => p._id !== message._id);
      setMessages(updatedMessages);
      showToast("Success", "Message deleted", "success");
  
      // Cập nhật lastMessage cho cuộc trò chuyện
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
        // Nếu không còn tin nhắn nào, có thể set lastMessage là null hoặc một giá trị mặc định
        setConversations((prevConvs) => {
          return prevConvs.map((conversation) => {
            if (conversation._id === selectedConversation._id) {
              return {
                ...conversation,
                lastMessage: null, // hoặc giá trị mặc định khác
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
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            {message.text}
          </Text>
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
