import { NextApiHandler ,NextApiRequest, NextApiResponse} from 'next';
import { withIronSession } from "next-iron-session";

const withAuth: (handler: NextApiHandler) => NextApiHandler = (handler) => {
  return withIronSession(
    //async function (context) {
    async (req: NextApiRequest, res: NextApiResponse) => {
      const user = req.session.user;

      if (!user) {
        return {
          redirect: {
            destination: "/login", // 未認証時のリダイレクト先
            permanent: false,
          },
        };
      }

      // ユーザーが存在する場合はhandlerを実行
      return await handler(req, res);
    },
    {
      cookieName: "login_info",
      password: "complex_password_at_least_32_characters_long",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
      },
    }
  );
}

export default withAuth;
