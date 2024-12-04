import type { ReactNode } from 'react';

import { ThemeProvider } from 'next-themes';
import { Footer } from './components/footer';
import { Header } from './components/header';
import { Meta } from './components/meta';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class">
      <Meta />
      {/* Since Vercel doesn't support dark and light as of yet, don't use `dark:bg-black` and instead use `bg-black` for now */}
      <div className="flex min-h-screen flex-col overflow-auto bg-black dark:text-white">
        <Header />
        <main className="wrapper flex-1 w-full">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};
