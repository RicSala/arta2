// [...nextauth] means that any route after /api/auth/ will be handled by this file, even if it has multiple segments.
// REVIEW: I think this is in the clien, so the use of checkUserEmail and checkOauthUser
// here can be problematic because they are database functions (they use mongoose)

import NextAuth from "next-auth";
import { authOptions } from "../../../utils/auth";

// authOptions is the configuration object for next-auth where you can configure the authentication providers

// sets up and exports the API route handler for authentication-related requests in your Next.js application
// that happen at the /api/auth endpoint.
export default NextAuth(authOptions);

// When users interact with the NextAuth sign-in, sign-out, or other authentication features, the
// requests will be sent to the /api/auth/[...nextauth].js endpoint. The handler returned by NextAuth(authOptions)
// takes care of processing these requests, handling the authentication flow, managing sessions,
// and communicating with the configured authentication providers.
