import NextAuth, {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbUsers } from "../../../database";
//import bcrypt from 'bcryptjs';
//import { User } from "../../../models";
//import { db } from "../../../database";

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
                  
          // await db.connect();
          // const user = await  User.findOne({email: credentials!.email});
          // await db.disconnect();

          // if (!user) {
          //   return null;
          // }
    
          // if (!bcrypt.compareSync(credentials!.password, user.password!)){
          //     return null;
          // }
          
          // return {
          //   email: user.email,
          //   name: user.name,
          //   role: user.role,
          //   _id: user._id,
          // };

          return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);

        } catch(error){
          console.error(error);
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
    async jwt({token, account, user}) {
     
      if(account) {
        token.accessToken = account.access_token;

        switch(account.type) {
          case 'oauth':

              // await db.connect();
              // const userdb = await User.findOne({email: user.email}) 

              // if(userdb){
              //   await db.disconnect();
              //   return {
              //     _id: userdb._id,
              //     name: userdb.name,
              //     email: userdb.email,
              //     role: userdb.role
              //   }
              // }

              // const newUser = new User({email: '', name: '', password: '', role: 'client'});
              // try {
              //   await newUser.save();
              //   await db.disconnect();
              //   return {
              //     _id: newUser._id,
              //     name: newUser.name,
              //     email: newUser.email,
              //     role: newUser.role
              //   }
              // } catch(e){

              // }
            
            token.user = await dbUsers.oAUthToDbUser( user?.email || '', user?.name || '' );

          break;

          case 'credentials':
            token.user = user;
          break;
        }

      }

      return token;
    },

    async session({session, token, user}){
      session.accessToken = token.accessToken;
      session.user = token.user;
      
      return session;
    }
  }
}
export default NextAuth(authOptions)