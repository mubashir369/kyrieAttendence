import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, 
  },
  pages: {
    signIn: "/login", 
  },
});

export const config = {
  matcher: [
  
"/((?!login|_next/static|_next/image|favicon.ico|api/test-db|api/admin/create).*)"
  ],
};
