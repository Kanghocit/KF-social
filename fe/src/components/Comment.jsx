import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from '../components/Actions';

const Comment = ({reply, lastReply}) => {
    const [liked, setLiked] = useState(false);

    return (
        <>
            <Flex gap={4} py={3} my={2} w="full">
                <Avatar src={reply?.userProfilePicture} size="sm" />
                <Flex gap={1} w="full" flexDirection="column">
                    <Flex w="full" justifyContent="space-between" alignItems="center">
                        <Text fontSize="sm" fontWeight="bold">{reply.username}</Text>
                        
                    </Flex>
                    <Text>{reply.text}</Text>
                    
                </Flex>
            </Flex>
            {!lastReply ? <Divider my={4} /> : null}
        </>
    );
}

export default Comment;
