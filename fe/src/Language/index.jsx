import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          english: "English",
          vietnamese: "Vietnamese",
          logout: "Logout",
          suggest: "Suggested Users",
          nouser: "No users to display",
          login: "Login",
          username: "Username",
          password: "Password",
          loginwithGoogle: "Login with Google",
          noneAccount: "Don't have an account?",
          loginsuccess: "Login Successfully 😍",
          signup: "Sign Up",
          or: "Or",
          edit:"Edit",
          delete: "Delete",
          copy:"Copy Link",
          follow: "Follow",
          unfollow: "Unfollow",
          search: "Search users...",
          yourconversation: "Your conversations",
          select: "Select a Conversation to start messaing",
          compose: "Compose a message...",
        },
      },
      vi: {
        translation: {
          welcome: "Chào mừng",
          english: "Tiếng anh",
          vietnamese: "Tiếng việt",
          logout: "Đăng xuất",
          suggest: "Đề xuất bạn bè",
          nouser: "Không có đề xuất nào cả",
          login: "Đăng nhập",
          username: "Tên đăng nhập",
          password: "Mật khẩu",
          loginwithGoogle: "Đăng nhập bằng Google",
          loginsuccess: "Đăng nhập thành công",
          noneAccount: "Bạn chưa có tài khoản?",
          signup: "Đăng ký",
          or: "Hoặc",
          edit:"Chỉnh sửa bài viết",
          delete: "Xóa bài viết",
          copy:"Sao chép liên kết",
          follow: "Theo dõi",
          unfollow: "Hủy theo dõi",
          search: "Tìm kiếm...",
          yourconversation: "Những cuộc trò chuyện",
          select: "Chọn một người bạn để bắt đầu trò chuyện nào💕",
          compose: "Soạn tin nhắn...",

        
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
