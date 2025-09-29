import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token, // only allow if user is logged in
  },
  pages: {
    signIn: "/login", // redirect here if not logged in
  },
});

export const config = {
  matcher: [
  
"/((?!login|_next/static|_next/image|favicon.ico|api/test-db|api/admin/create).*)"
  ],
};
