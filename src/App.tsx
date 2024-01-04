import React from "react";
import { MyProvider } from "./context/MyContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainApp } from "./MainWrapper";
export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <MyProvider>
     <MainApp/>
    </MyProvider>
  );
}
