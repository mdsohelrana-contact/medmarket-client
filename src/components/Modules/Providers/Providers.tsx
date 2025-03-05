"use client";

import StoreProvider from "./StoreProvider/StoreProvider";
import ThemeProvider from "./ThemeProvider/ThemeProvider";

const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>{children}</StoreProvider>
    </ThemeProvider>
  );
};

export default Providers;
