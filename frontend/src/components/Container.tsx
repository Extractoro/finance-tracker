import { ReactNode } from 'react';

const Container = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
      <div className="flex flex-col items-center w-full max-w-[1280px] m-auto px-2.5">{children}</div>
  );
};
export default Container;
