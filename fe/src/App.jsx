import { Box, Container, Flex } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import PostPage from "./pages/PostPage";
import UserPage from "./pages/UserPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import userAtom from "./atoms/userAtom";
import { useRecoilValue } from "recoil";
import LogoutButton from "./components/LogoutButton";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import LeftSideBar from "./components/LeftSideBar";
import SearchPage from "./pages/SearchPage";
import { useDisclosure } from "@chakra-ui/react";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useRecoilValue(userAtom);
  const { pathname } = useLocation();
  const imgStyle = {
    backgroundImage: "url('img2.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: "",
  };
  return (
    <Flex
      position="relative"
      w="full"
      minH="100vh"
      style={pathname === "/auth" ? imgStyle : {}}
    >
      <Box w="250px" p={4} position="sticky" top={0}>
        <LeftSideBar onOpen={onOpen} />
      </Box>

      <Container
        maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}
        ml="200px"
        mt="64px"
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />

          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />{" "}
                  <CreatePost
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpen={onOpen}
                  />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
          />
        </Routes>
      
          <CreatePost isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
   
        {user && <LogoutButton />}
      </Container>
    </Flex>
  );
}

export default App;
