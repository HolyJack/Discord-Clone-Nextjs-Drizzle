import NextAuth from "next-auth";

const secret = process.env.NEXTAUTH_SECRET;

const handler = NextAuth({ providers: [], pages: { signIn: "/login" } });

export { handler as GET, handler as POST };
