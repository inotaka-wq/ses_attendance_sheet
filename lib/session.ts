import { withIronSession } from "next-iron-session";
import { SessionOptions } from "next-iron-session";

export const sessionOptions: SessionOptions = {
  cookieName: "login_info",
  password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// セッションを使用するためのヘルパー関数
export function withSession(handler: any) {
  return withIronSession(handler, sessionOptions);
}
