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
    <Flex align={"center"} justify={"center"} py={12}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} w={"full"} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.dark")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"} mb={5}>
              {t("login")}
            </Heading>
          </Stack>

          <Stack spacing={4} pt={5}>
            {/* Username Input */}
            <FormControl isRequired>
              <FormLabel>{t("username")}</FormLabel>
              <Input
                type="text"
                value={inputs.username}
                onChange={(e) =>
                  setInputs({ ...inputs, username: e.target.value })
                }
              />
            </FormControl>

            {/* Password Input */}
            <FormControl isRequired>
              <FormLabel>{t("password")}</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs({ ...inputs, password: e.target.value })
                  }
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

            <Stack spacing={4} pt={4}>
              {/* Login Button */}
              <Button
                isLoading={loading}
                loadingText="Logging in"
                size="lg"
                bg={useColorModeValue("gray.600", "gray.800")}
                color={"white"}
                _hover={{ bg: useColorModeValue("gray.700", "gray.900") }}
                onClick={handleLogin}
                w="full"
              >
                {t("login")}
              </Button>
              <Box display="flex" alignItems="center" justifyContent="center">
                {t("or")}
              </Box>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() =>
                  showToast("Error", "Google Login failed", "error")
                }
                size="large"
                disabled={googleLoading}
                width={"400px"}
                render={(renderProps) => (
                  <Button
                    {...renderProps}
                    isLoading={googleLoading}
                    loadingText="Logging in with Google"
                    alignItems={"center"}
                    leftIcon={
                      <img
                        src="google-icon.svg"
                        alt="Google Icon"
                        width="20px"
                      />
                    }
                    sx={{
                      padding: 0,
                    }}
                  >
                    {t("loginwithGoogle")}
                  </Button>
                )}
              />
            </Stack>

            {/* Link to Sign up */}
            <Stack pt={6}>
              <Text align={"center"}>
                {t("noneAccount")}{" "}
                <Link
                  color={"blue.400"}
                  onClick={() => setAuthScreen("signup")}
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
