import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Flex,
  Text,
  useToast,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
  Avatar,
  Input,
  Center,
} from "@chakra-ui/react";
import { BsFillImageFill, BsThreeDots } from "react-icons/bs";
import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Route, useNavigate } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useRef, useState } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import { useLocation } from "react-router-dom";

const PostMenu = ({ user, post }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [updating, setUpdating] = useState(false);
  const { handleImageChange, imgUrl } = usePreviewImg();
  const toast = useToast();
  const showToast = useShowToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [inputs, setInputs] = useState({
    text: post.text,
    img: post.img,
  });
  const currentPost = posts[0];

  // Handle Save Post
  const handleSave = async (e) => {
    e.preventDefault();
    if (updating) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/posts/update/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, img: imgUrl }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post updated successfully!", "success");
      setPosts(
        posts.map((p) =>
          p._id === post._id ? { ...p, ...inputs, img: imgUrl } : p
        )
      );
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setUpdating(false);
      onClose();
    }
  };

  const OpenEditMenu = () => {
    onOpen();
  };

  // Handle Delete Post
  const handleDeleteClick = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      setPosts(posts.filter((p) => p._id !== post._id));
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  // Copy URL of the post
  const copyURL = () => {
    const postURL = `${window.location.origin}/${user.username}/post/${post._id}`;
    navigator.clipboard.writeText(postURL).then(() => {
      toast({
        title: "Link copied.",
        description: "The link has been copied to your clipboard.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  return (
    <>
      <Menu closeOnSelect={true}>
        <MenuButton as={IconButton} icon={<BsThreeDots />} variant="ghost" />
        <MenuList minWidth="240px" borderRadius="lg" bg={"gray.dark"}>
          {pathname !== "/" && (
            <>
              <MenuItem
                onClick={OpenEditMenu}
                bg={"gray.dark"}
                _active={{ bg: "gray.dark" }}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <Text fontWeight="bold">Edit</Text>
                  <EditIcon />
                </Flex>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={handleDeleteClick}
                bg={"gray.dark"}
                _active={{ bg: "gray.dark" }}
              >
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <Text color="red.500" fontWeight="bold">
                    Delete
                  </Text>
                  <DeleteIcon color="red.500" />
                </Flex>
              </MenuItem>
              <MenuDivider />
            </>
          )}

          <MenuItem bg={"gray.dark"} onClick={copyURL}>
            Copy link
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Modal for Updating Post */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.dark"}>
          <ModalHeader>
            <Flex justifyContent={"space-between"} w={"full"}>
              <Flex w={"full"} alignItems={"center"}>
                <Avatar
                  size={"md"}
                  name={user.name}
                  src={user.profilePicture}
                />
                <Text fontSize={"sm"} fontWeight={"bold"} ml={2}>
                  {user.username}
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={1} />
              </Flex>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              onChange={(e) => setInputs({ ...inputs, text: e.target.value })}
              value={inputs.text}
              type="text"
              border="none"
              padding="0"
              borderRadius="md"
              _focus={{ boxShadow: "none" }}
              placeholder="Enter text"
            />

            <Box overflow={"hidden"} borderColor={"gray.light"}>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />
              <Image
                borderRadius={"6"}
                src={imgUrl || post.img}
                w={"full"}
                onClick={() => imageRef.current.click()}
                maxHeight={"400px"}
                width={"auto"}
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              bg={"green.400"}
              color={"white"}
              _hover={{ bg: "green.500" }}
              onClick={handleSave}
              isLoading={updating}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostMenu;
