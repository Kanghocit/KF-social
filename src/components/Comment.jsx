import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from '../components/Actions';

const Comment = ({userAvatar, createAt, comment, username, likes}) => {
    const [liked, setLiked] = useState(false);

    return (
        <>
            <Flex gap={4} py={3} my={2} w="full">
                <Avatar src={userAvatar} size="sm" />
                <Flex gap={1} w="full" flexDirection="column">
                    <Flex w="full" justifyContent="space-between" alignItems="center">
                        <Text fontSize="sm" fontWeight="bold">{username}</Text>
                        <Flex gap={2} alignItems="center">
                            <Text fontSize="sm" color="gray.light">{createAt}</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text>{comment}</Text>
                    <Actions liked={liked} setLiked={setLiked} />
                    <Text fontSize="sm" color="gray.light">
                        {likes + (liked ? 1 : 0)} likes
                    </Text>
                </Flex>
            </Flex>
            <Divider my={4} />
        </>
    );
}

export default Comment;
