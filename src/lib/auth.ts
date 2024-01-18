import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/db/prisma';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: {
          label: 'User Name',
          type: 'text',
          placeholder: 'Your User Name',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if(!user) throw new Error('User name or password is not correct');

        if(!credentials?.password) throw new Error('Please Provide Your Password');
        const isPassowrdCorrect = await bcrypt.compare(credentials.password, user.password);

        if(!isPassowrdCorrect) throw new Error('User name or password is not correct');

        // if(!user.emailVerified) throw new Error('Please verify your email first!');

        const { password: _, ...userWithoutPass } = user;
        return userWithoutPass;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if(user) token.user = user as User;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

export function auth(...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions);
}

export default auth;