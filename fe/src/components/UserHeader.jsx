import { Box, Flex, Link, VStack, Text } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/avatar"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { Button, Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from "@chakra-ui/react"
import {useRecoilValue} from 'recoil';
import userAtom from '../atoms/userAtom';
import {Link as RouterLink} from 'react-router-dom'
import { useState } from "react"
import useShowToast from "../hooks/useShowToast"

const UserHeader = ({ user }) => {
    const toast = useToast();
    const currentUser = useRecoilValue(userAtom); //logged in user
    const [following, setFollowing] = useState(user.followers.includes(currentUser._id));
    const showToast = useShowToast();
    const [updating, setUpdating] = useState(false);



    const copyURL = () => {
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL).then(() => {
            toast({
                title: 'Account created.',
                description: "Profile link copied.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
    }

    const handleFollowUnFollow = async() => {
        if(!currentUser){
            showToast("Error", "Please login to follow", "error");
            return;
        }
        if(updating) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/users/follow/${user._id}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await res.json();
            if(data.error){
                showToast("Error", data.error, "error");
                return
            }
            console.log(data);

            if(following){
                showToast("success", `Unfollowed ${user.name}`, "success");
                user.followers.pop();
            }else{
                showToast("success", `Followed ${user.name}`, "success");
                user.followers.push(currentUser._id); //simulate adding to followers
            }
            setFollowing(!following);

        } catch (error) {
            showToast("Error", error, "error");
        }finally{
            setUpdating(false);
        }
    }
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} >{user.username}</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>KF.net</Text>
                    </Flex>
                </Box>
                <Box>
                    {user.profilePicture && (
                        <Avatar
                            name={user.name}
                            src={user.profilePicture}
                            size={{
                                base: "md",
                                md: "xl"
                            }}
                        />
                    )}
                    {!user.profilePicture && (
                        <Avatar
                            name={user.name}
                            src='https://bit.ly/broken-link'
                            size={{
                                base: "md",
                                md: "xl"
                            }}
                        />
                    )}
                </Box>
            </Flex>

            <Text>{user.bio}</Text>

            {currentUser._id === user._id &&(
                <Link as={RouterLink} to="/update">
                    <Button size={"sm"}> Update Profile</Button>
                </Link>
            )}
            {currentUser._id !== user._id &&(
                <Link as={RouterLink} >
                    <Button size={"sm"} onClick={handleFollowUnFollow} isLoading={updating}>{following ? "Unfollow" : "Follow"}</Button>
                </Link>
            )}
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>{user.followers.length} followers</Text>
                    <Box w={1} h={1} borderRadius={"full"} bg="gray.light"></Box>
                    <Link color={"gray.light"}>instagram.com</Link>
                </Flex>
                <Flex>
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>
                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"} >
                                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>
                </Flex>
            </Flex>

            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb={3} cursor={"pointer"}>
                    <Text fontWeight={"bold"}>KF</Text>
                </Flex>
                <Flex
                    flex={1}
                    borderBottom={"1px solid gray"}
                    justifyContent={"center"}
                    color={"gray.light"}
                    pb="3"
                    cursor={"pointer"}
                >
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>
        </VStack>
    )
}

export default UserHeader