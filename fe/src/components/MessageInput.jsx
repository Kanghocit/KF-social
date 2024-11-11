import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai"; 
import useShowToast from "../hooks/useShowToast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messageAtom";
import { BsFillImageFill } from "react-icons/bs";
import usePreViewImg from "../hooks/usePreviewImg";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const showToast = useShowToast();
  const setConversations = useSetRecoilState(conversationsAtom);
  const imageRef = useRef(null);
  const { handleImageChange, imgUrl, setImgUrl } = usePreViewImg();
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText && !imgUrl) return;
    if (isSending) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
          img: imgUrl,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setMessages((messages) => [...messages, data]);

      setConversations((prevConvs) => {
        const updatedConversations = prevConvs.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }
          return conversation;
        });
        return updatedConversations;
      });

      setMessageText("");
      setImgUrl("");
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setIsSending(false);
    }
  };

  const handleRemoveImage = () => {
    setImgUrl(""); // Clear the image URL
    imageRef.current.value = null; // Reset the file input
  };

  return (
    <Flex  gap={2} position="relative">
      
      {imgUrl && (
        <Flex
          position="absolute"
          top="-145px" // Adjust this value to control how high the image floats
          left="10px"
          width="100%"
          justifyContent="flex-end"
          alignItems="right"
          p={2}
          maxH="150px"
          overflow="hidden"
          zIndex="1"
          bg={"#1e1e1e"}
        >
          <Image
            src={imgUrl}
            alt="Selected"
            maxH="150px"
            objectFit="contain"
            alignItems={"right"}
          />
          <IconButton
            aria-label="Remove image"
            icon={<AiOutlineClose />}
            onClick={handleRemoveImage}
            position="absolute"
            top="5px"
            right="10px"
            size="sm"
            bg="transparent" 
            color="black" 
            _hover={{
              bg: "transparent",
              color: "red", 
            }}
            _active={{
              bg: "transparent", 
            }}
            _focus={{
              boxShadow: "none", 
            }}
          />
        </Flex>
      )}


      <Flex
        gap={2}
        alignItems="center"
        height="50px"
      >
        <Flex cursor="pointer">
          <BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
          <Input
            type="file"
            hidden
            ref={imageRef}
            onChange={handleImageChange}
          />
        </Flex>
        <form onSubmit={handleSendMessage} >
          <InputGroup>
            <Input
              w={{ base: "400px", md: "500px" }}
              placeholder="Type a message"
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
            <InputRightElement onClick={handleSendMessage} cursor="pointer">
              <IoSendSharp />
            </InputRightElement>
          </InputGroup>
        </form>
      </Flex>
    </Flex>
  );
};

export default MessageInput;