import { Flex, Link, Avatar } from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const Header = () => {
  const user = useRecoilValue(userAtom);
  console.log("user", user);
  return (
    <Flex
      position="fixed"
      top={0}
      left={100}
      width="full"
      
      zIndex={1000}
      justifyContent={"flex-end"}
      mt={0}
      mb={4}
      p={4}
    >
      {user && (
        <Flex mr={"100px"}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <Avatar
              size={{ base: "xs", sm: "sm", md: "md" }}
              src={user.profilePicture}
            ></Avatar>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
