import { Flex, Avatar, Text, Image, Box } from "@chakra-ui/react"
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";


const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src='/kang-avatar.png' size={"md"} name="kang15.8" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>An Khang</Text>
            <Image src='/verified.png' w="4" h={4} ml={4} />
          </Flex>
        </Flex>

        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Let's talk about KF</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src="/post1.png" w={"full"}/>
      </Box>

      <Flex gap={3} my={3}>
        <Action liked={liked} setLiked={setLiked}/>
      </Flex>

      <Flex>  </Flex>
    </>
  )
}

export default PostPage;