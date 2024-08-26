import { Box, Flex, Link, VStack, Text } from "@chakra-ui/layout"
import { Avatar } from "@chakra-ui/avatar"
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { Menu, MenuButton, MenuItem, MenuList, Portal, useToast } from "@chakra-ui/react"

const UserHeader = () => {
    const toast = useToast();

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
    return (
        <VStack gap={4} alignItems={"start"}>
            <Flex justifyContent={"space-between"} w={"full"}>
                <Box>
                    <Text fontSize={"2xl"}>
                        An Khang
                    </Text>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} >Kang15.8</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>KF.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar
                        name="An Khang"
                        src="/kang-avatar.png"
                        size={{
                            base: "md",
                            md: "xl"
                        }}
                    />
                </Box>
            </Flex>

            <Text>Final year student of Industrial University.</Text>
            <Flex w={"full"} justifyContent={"space-between"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text color={"gray.light"}>1.5K followers</Text>
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