declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }

  interface Token {
    accessToken?: string;
  }
}
