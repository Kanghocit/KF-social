import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const setAuthScreen = useSetRecoilState(authScreenAtom);

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);

  const handleSignup = async () => {
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      localStorage.setItem("users-KF", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} w={"full"} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"2xl"}
          p={8}
          borderColor={useColorModeValue("blue.300", "blue.600")}
          borderWidth="1px"
        >
          <Stack align={"center"}>
            <Heading
              fontSize={"4xl"}
              textAlign={"center"}
              bgGradient="linear(to-r, teal.500, blue.400)"
              bgClip="text"
            >
              {t("signup")}
            </Heading>
          </Stack>
          <Stack spacing={6} pt={9}>
            {/* Full Name and Username */}
            <HStack spacing={4}>
              <Box w="full">
                <FormControl isRequired>
                  <FormLabel color="gray.600">{t("fullname")}</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, name: e.target.value })
                    }
                    value={inputs.name}
                    focusBorderColor="blue.400"
                  />
                </FormControl>
              </Box>
              <Box w="full">
                <FormControl isRequired>
                  <FormLabel color="gray.600">{t("username")}</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) =>
                      setInputs({ ...inputs, username: e.target.value })
                    }
                    value={inputs.username}
                    focusBorderColor="blue.400"
                  />
                </FormControl>
              </Box>
            </HStack>

            {/* Email */}
            <FormControl id="email" isRequired>
              <FormLabel color="gray.600">{t("email")}</FormLabel>
              <Input
                type="email"
                onChange={(e) =>
                  setInputs({ ...inputs, email: e.target.value })
                }
                value={inputs.email}
                focusBorderColor="blue.400"
              />
            </FormControl>

            {/* Password */}
            <FormControl id="password" isRequired>
              <FormLabel color="gray.600">{t("password")}</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  value={inputs.password}
                  focusBorderColor="blue.400"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* Signup Button */}
            <Stack spacing={10} pt={6}>
              <Button
                loadingText={t("submitting")}
                size="lg"
                bgGradient="linear(to-r, blue.500, blue.700)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, blue.600, blue.800)",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease",
                }}
                onClick={handleSignup}
              >
                {t("signup")}
              </Button>
            </Stack>

            {/* Link to Login */}
            <Stack pt={6}>
              <Text align={"center"} color="gray.600">
                {t("already")}{" "}
                <Link
                  color={"blue.500"}
                  fontWeight="bold"
                  onClick={() => setAuthScreen("login")}
                  _hover={{
                    textDecoration: "underline",
                    color: "blue.600",
                  }}
                >
                  {t("login")}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
