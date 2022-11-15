import NextAuth, {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
      },
      async authorize(credentials) {       
        
        const user = await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );

        console.log(user);
        
        
        return null;
      }
    }),


    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],

  callbacks: {
    async jwt({token, account, user}) {
      console.log(1);
      
      if(account) {
        token.accessToken = account.access_token;

        switch(account.type) {
          case 'oauth':

          break;

          case 'credentials':
            token.user = user;
          break;
        }

      }

      return token;
    },

    async session({session, token, user}){
      console.log(2);
      session.accessToken = token.accessToken;
      session.user = token.user;
      
      return session;
    }
  }
}
export default NextAuth(authOptions)