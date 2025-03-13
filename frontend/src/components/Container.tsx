import { ReactNode } from 'react';

const Container = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <div className="w-full max-w-[1280px] m-auto px-2.5 min-h-screen">{children}</div>
    </main>
  );
};
export default Container;
