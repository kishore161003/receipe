"use client";
import "./globals.css";
import { ScrollArea } from "@components/ui/scroll-area";
// import ScrollArea from "@/components/ui/scroll-area";
import SideBar from "@components/SideBar";
import MyProvider from "@lib/context/userContext";
import Provider from "@components/Provider"; 
const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        {" "}
        <main className="flex">
          <Provider>
            <SideBar />
            <ScrollArea className="h-screen w-screen">{children}</ScrollArea>
          </Provider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
