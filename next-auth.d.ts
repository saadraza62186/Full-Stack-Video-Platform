import { DefaultSession } from "next-auth";


// 👇 Extend next-auth session
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ Use 'string' not 'String'
    } & DefaultSession["user"];
  }
}
