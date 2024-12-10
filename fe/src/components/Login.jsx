import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Link,
  Heading,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const { t } = useTranslation();

  // Handle regular login with username and password
  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.setItem("users-KF", JSON.stringify(data));
      setUser(data);
      showToast("Success", t("loginsuccess"), "success");
    } catch (error) {
      showToast("Error", error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (credentialResponse) => {
    setGoogleLoading(true);
    try {
      const token = credentialResponse.credential;
      console.log("Google Token:", token);

      const res = await fetch("/api/users/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      console.log("Google login data:", data);

      localStorage.setItem("users-KF", JSON.stringify(data));

      setUser(data);

      showToast("Success", t("loginsuccess"), "success");
    } catch (error) {
      showToast("Error", "Google Login failed", "error");
    } finally {
      setGoogleLoading(false);
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
              mb={5}
              bgGradient="linear(to-r, blue.500, teal.400)"
              bgClip="text"
            >
              {t("login")}
            </Heading>
          </Stack>

          <Stack spacing={6} pt={5}>
            {/* Username Input */}
            <FormControl isRequired>
              <FormLabel color="gray.600">{t("username")}</FormLabel>
              <Input
                type="text"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
                focusBorderColor="blue.400"
              />
            </FormControl>

            {/* Password Input */}
            <FormControl isRequired>
              <FormLabel color="gray.600">{t("password")}</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
                  focusBorderColor="blue.400"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* Login Button */}
            <Button
              isLoading={loading}
              loadingText={t("loggingIn")}
              size="lg"
              bgGradient="linear(to-r, blue.500, blue.700)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, blue.600, blue.800)",
                transform: "scale(1.05)",
                transition: "all 0.3s ease",
              }}
              onClick={handleLogin}
              w="full"
            >
              {t("login")}
            </Button>

            <Text textAlign={"center"} color="gray.500" pt={2}>
              {t("or")}
            </Text>

            {/* Google Login Button */}
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => showToast("Error", "Google Login failed", "error")}
              size="large"
              disabled={googleLoading}
              width={"400px"}
              render={(renderProps) => (
                <Button
                  {...renderProps}
                  isLoading={googleLoading}
                  loadingText={t("loggingInGoogle")}
                  alignItems={"center"}
                  leftIcon={
                    <img
                      src="google-icon.svg"
                      alt="Google Icon"
                      width="20px"
                      style={{ marginRight: "8px" }}
                    />
                  }
                  bg="white"
                  border="1px solid"
                  borderColor="gray.300"
                  _hover={{
                    bg: "blue.50",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  }}
                  _active={{ transform: "scale(0.98)" }}
                  w="full"
                >
                  {t("loginwithGoogle")}
                </Button>
              )}
            />

            {/* Link to Sign up */}
            <Stack pt={6}>
              <Text align={"center"} color="gray.600">
                {t("noneAccount")}{" "}
                <Link
                  color={"blue.500"}
                  fontWeight="bold"
                  onClick={() => setAuthScreen("signup")}
                  _hover={{
                    textDecoration: "underline",
                    color: "blue.600",
                  }}
                >
                  {t("signup")}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
