import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  useColorMode
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { AiFillHome } from "react-icons/ai";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { Link, Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useLogout from "../hooks/useLogout";
import { useLocation } from "react-router-dom";

const LeftSideBar = ({ onOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();
  const logout = useLogout();
  const bg = {
    bg: "none",
    _hover: { bg: colorMode === "dark" ? "#1e1e1e" : "#cbd5e0" },
    _focus: { boxShadow: "none", outline: "none" },
  };
  const bg1 = {
    bg: colorMode === "dark" ? "#111" : "#cbd5e0",
    _hover: { bg: colorMode === "dark" ? "#1e1e1e" : "#cbd5e0" },
    _focus: { boxShadow: "none", outline: "none" },
  };
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
          <Button onClick={pathname === "/" || pathname === "/" + user.username ? onOpen : ""} {...bg}>
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
        <Menu closeOnSelect={false} cursor={"pointer"}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            bg={"none"}
          />

          <MenuList
            minWidth="200px"
            bg={colorMode === "dark" ? "#111" : "#cbd5e0"}
          >
            <Box
              display="flex"
              pl={9}
              py={2}
              {...bg1}
              justifyContent="flex-start"
              cursor={"pointer"}
              onClick={() => changeLanguage("en")}
            >
              {t("english")}
            </Box>
            <Box
              display="flex"
              pl={9}
              py={2}
              {...bg1}
              justifyContent="flex-start"
              cursor={"pointer"}
              onClick={() => changeLanguage("vi")}
            >
              {t("vietnamese")}
            </Box>
            <MenuDivider />
            <Box
              onClick={logout}
              display="flex"
              pl={9}
              py={2}
              justifyContent="flex-start"
              {...bg1}
              cursor={"pointer"}
            >
              {t("logout")}
            </Box>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};

export default LeftSideBar;
{
  /* <Button
          onClick={logout}
          {...bg}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FiLogOut size={20} />
        </Button> */
}
