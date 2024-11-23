import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: function() { return !this.googleId; },  // Yêu cầu username khi không có googleId
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: function() { return !this.googleId; }, // Mật khẩu chỉ yêu cầu khi không có googleId
    },
    profilePicture: {
      type: String,
      default: "", // Bạn có thể dùng giá trị mặc định từ Google nếu cần
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
      default: null, // Chứa googleId khi người dùng đăng nhập qua Google
    },
  },
  {
    timestamps: true, // Đảm bảo lưu thời gian tạo và cập nhật của bản ghi
  }
);

// Tạo model User từ schema
const User = mongoose.model("User", userSchema);

export default User;
