import React from 'react';

import SessionProvider from '@/app/(console)/context';
import AppView from '@/app/(console)/_appview';

const ConsoleLayout = async ({ children }: { children: React.ReactNode }) => {
    
  return (
      <SessionProvider>
          <AppView>
              {children}
          </AppView>
      </SessionProvider>
  );
};

export default ConsoleLayout;