import React from "react";
import { MyProvider } from "./context/MyContext";
import { MainApp } from "./MainWrapper";
export default function App() {

  return (
    <MyProvider>
     <MainApp/>
    </MyProvider>
  );
}
