import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GG_CLIENT_ID);

/**
 * Xác minh token từ Google và trả về thông tin người dùng
 * @param {string} token - Token từ Google được gửi từ phía client
 * @returns {Object} Thông tin người dùng từ Google
 */
export const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GG_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
      email: payload.email,
      name: payload.name,
      googleId: payload.sub,
      picture: payload.picture,
    };
  } catch (error) {
    console.error("Google token verification failed:", error);
    throw new Error("Google token verification failed");
  }
};
