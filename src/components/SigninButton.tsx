'use client';

import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

import Button from '@/components/button';

const SignInButton = () => {
  const { data: session } = useSession();

  return (
      <div className="flex items-center gap-2">
          {session && session.user ? (
              <>
                  <Link href="/profile">{`${session.user.firstName} ${session.user.lastName}`}</Link>
                  <Link
                      className="tex-sky-500 hover:text-sky-600 transition-colors"
                      href="/api/auth/signout"
                  >
                      Sign Out
                  </Link>
              </>
          ) : (
              <>
                  <Button onClick={() => signIn()}>Sign In</Button>
                  <Button link="/auth/signup">
                      Sign Up
                  </Button>
              </>
          )}
      </div>
  );
};

export default SignInButton;
