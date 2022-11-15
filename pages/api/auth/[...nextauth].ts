import NextAuth, {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { User } from "../../../models";
import { db } from "../../../database";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Prueba',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
      },
      async authorize(credentials: any):Promise<any> {
        try {
                  
          await db.connect();
          const user = await  User.findOne({email: credentials!.email});
          await db.disconnect();

          if (!user) {
            return null;
          }
    
          if (!bcrypt.compareSync(credentials!.password, user.password!)){
              return null;
          }
          
          return user;
        } catch(error){
          console.log(error);
          return null;
        }
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],

  callbacks: {
    // async jwt({token, account, user}) {
    //   console.log(1);
      
    //   if(account) {
    //     token.accessToken = account.access_token;

    //     switch(account.type) {
    //       case 'oauth':

    //       break;

    //       case 'credentials':
    //         token.user = user;
    //       break;
    //     }

    //   }

    //   return token;
    // },

    // async session({session, token, user}){
    //   console.log(2);
    //   session.accessToken = token.accessToken;
    //   session.user = token.user;
      
    //   return session;
    // }
  }
}
export default NextAuth(authOptions)