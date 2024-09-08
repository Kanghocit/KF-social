import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";  // Sử dụng useNavigate để điều hướng

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();  // Khởi tạo useNavigate

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        showToast("Error", data.error, "error"); // Hiển thị lỗi nếu có
        return;
      }

      // Xóa thông tin người dùng khỏi localStorage và trạng thái Recoil
      localStorage.removeItem("users-KF");
      setUser(null);
      navigate("/auth");  // Điều hướng về trang xác thực sau khi đăng xuất
    } catch (error) {
      showToast("Error", error.message, "error"); // Hiển thị lỗi khi không thể đăng xuất
    }
  };

  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
      <FiLogOut size={20} />
    </Button>
  );
};

export default LogoutButton;
