import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Image,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link, Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useLogout from "../hooks/useLogout";
import { IoSearch } from "react-icons/io5";

const LeftSideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const logout = useLogout();
  const bg = {
    bg: "none",
    _hover: { bg: "none" },
    _focus: { boxShadow: "none", outline: "none" },
  };
  return (
    <Flex
      flexDirection="column"
      alignItems="left"
      justifyContent="space-between"
      height="96%"
      position={"fixed"}
    >
      <Image
        cursor="pointer"
        alt="logo"
        w={10}
        mb={8}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
        ml={2}
      />

      {user && (
        <Flex flexDirection="column" alignItems="left" gap={6} pl={1}>
          {" "}
          {/* Space out the icons */}
          <Button {...bg}>
            <Link as={RouterLink} to="/">
              <AiFillHome size={26} />
            </Link>
          </Button>
          <Button {...bg}>
            <Link as={RouterLink} to="/search">
              <IoSearch size={26} />
            </Link>
          </Button>
          <Button onClick={onOpen} {...bg}>
            <AddIcon />
          </Button>
          <Button {...bg}>
            <Link as={RouterLink} to="/chat">
              <BsFillChatQuoteFill size={24} />
            </Link>
          </Button>
        </Flex>
      )}

      {/* Logout button at the bottom */}
      {user && (
        <Button
          onClick={logout}
          {...bg}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FiLogOut size={20} />
        </Button>
      )}
    </Flex>
  );
};

export default LeftSideBar;
