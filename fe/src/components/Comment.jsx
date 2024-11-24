import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";


const Comment = ({ reply, lastReply }) => {
  console.log("reply",reply)
  return (
    <>
      <Flex gap={4} py={3} my={2} w="full">
        <Avatar src={reply?.userProfilePicture} size="sm" />
        <Flex gap={1} w="full" flexDirection="column">
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" fontWeight="bold">
              {reply?.username}
            </Text>
          </Flex>
          <Text>{reply?.text}</Text>
        </Flex>
      </Flex>
      {!lastReply ? <Divider my={4} /> : null}
    </>
  );
};

export default Comment;
