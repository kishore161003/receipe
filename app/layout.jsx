"use client";
import "./globals.css";
import { ScrollArea } from "@components/ui/scroll-area";
// import ScrollArea from "@/components/ui/scroll-area";
import SideBar from "@components/SideBar";
import MyProvider from "@lib/context/userContext";

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        {" "}
        <main className="flex">
          <MyProvider>
            <SideBar />
            <ScrollArea className="h-screen w-screen">{children}</ScrollArea>
          </MyProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
