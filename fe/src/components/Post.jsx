import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import PostMenu from "./PostMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";

const Post = ({ post, postedBy}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  if (!user) return null;

  return (
    <Flex gap={3} mb={4} py={5}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Avatar
          size={"md"}
          name={user.name}
          src={user.profilePicture}
          onClick={(e) => {
            e.preventDefault();
            navigate(`/${user.username}`);
          }}
        />
        <Box w="1px" h={"full"} my={2} bg="gray.light"></Box>
        <Box position={"relative"} w={"full"}>
          {post.replies.length === 0 && <Text textAlign={"center"}>😒</Text>}
          {post.replies[0] && (
            <Avatar
              size={"xs"}
              name="John"
              src={post.replies[0].userProfilePicture}
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
          )}
          {post.replies[1] && (
            <Avatar
              size={"xs"}
              name="John"
              src={post.replies[1].userProfilePicture}
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
          )}
          {post.replies[2] && (
            <Avatar
              size={"xs"}
              name="John"
              src={post.replies[2].userProfilePicture}
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          )}
        </Box>
      </Flex>
      <Flex flex={1} flexDirection={"column"} gap={"2"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Flex w={"full"} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={1} />
          </Flex>
          <Flex gap={4} alignItems={"center"}>
            <Text
              fontSize={"xs"}
              width={36}
              textAlign={"right"}
              color={"gray.light"}
            >
              {formatDistanceToNow(new Date(post.createdAt))}
            </Text>
            {currentUser?._id === user._id && (
              <PostMenu user={user} post={post} onOpen={onOpen} />
            )}
          </Flex>
        </Flex>

        <Text fontSize={"sm"}>{post.text}</Text>
        {post.img && (
          <Link to={`/${user.username}/post/${post._id}`}>
            <Box
              borderRadius={"6"}
              overflow={"hidden"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} maxHeight={"350px"} width={"auto"}/>
            </Box>
          </Link>
        )}
        <Flex gap={3} my={1}>
          <Actions post={post} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Post;
