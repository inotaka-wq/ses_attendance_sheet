import 'next-iron-session';

declare module 'next-iron-session' {
  interface IronSessionData {
    user?: any; // またはより具体的な型にする
  }
}

declare module 'next' {
  import { IronSessionData } from 'next-iron-session';

  interface NextApiRequest {
    session: IronSessionData;
  }
}
