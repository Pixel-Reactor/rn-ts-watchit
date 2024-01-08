import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MovieDetails from "./components/MovieDetails";
import Options from "./screens/Options";
import Populars from "./screens/Populars";
import Search from "./screens/Search";
import MyMovies from "./screens/MyMovies";
import MovieSwitch from "./components/MovieSwitch";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { useMyContext } from "./context/MyContext";

export const MainApp = () => {
  const Tab = createBottomTabNavigator();
  const { language } = useMyContext();

  return (
    
    <NavigationContainer>
     
      <Tab.Navigator
        screenOptions={({ route }) => ({
          activeTintColor: "tomato",
          inactiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "rgba(24,24,27,0.99)",
            height: 80,
            paddingBottom: 10,
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === "Populares") {
              iconName = focused ? "ios-barcode" : "ios-barcode-outline";
            } else if (route.name === "Buscar") {
              iconName = focused ? "search-sharp" : "search";
            } else if (route.name === "Mis Peliculas") {
              iconName = focused ? "film-sharp" : "film-outline";
            } else if (route.name === "Opciones") {
              iconName = focused ? "options-sharp" : "options-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Populares"
          component={Populars}
          options={{
            title: language.populars,

            headerStyle: {
              backgroundColor: "rgba(24,24,27,0.99)",
            },
            headerTitleStyle: { color: "#ffffff", fontSize: 20 },
            headerStatusBarHeight: 15,
            headerRight: () => <MovieSwitch />,
          }}
        />
        <Tab.Screen
          name="Buscar"
          component={Search}
          options={{
            title: language.search,
            headerStyle: {
              backgroundColor: "rgba(24,24,27,0.99)",
            },
            headerTitleStyle: { color: "#ffffff", fontSize: 20 },

            headerStatusBarHeight: 15,
            headerRight: () => <MovieSwitch />,
          }}
        />
        <Tab.Screen
          name="Mis Peliculas"
          component={MyMovies}
          options={{
            title: language.mymovies,
            headerStyle: {
              backgroundColor: "rgba(24,24,27,0.99)",
            },
            headerTitleStyle: { color: "#ffffff", fontSize: 20 },
            headerTintColor: "red",
            headerStatusBarHeight: 15,
            headerRight: () => <MovieSwitch />,
          }}
        />
        <Tab.Screen
          name="Opciones"
          component={Options}
          options={{
            title: language.options,
            headerStyle: {
              backgroundColor: "rgba(24,24,27,0.99)",
            },
            headerTitleStyle: { color: "#ffffff", fontSize: 20 },
            headerTintColor: "red",
            headerStatusBarHeight: 15,
            headerRight: () => <MovieSwitch />,
          }}
        /> 
       
      </Tab.Navigator> 
      <MovieDetails />
    </NavigationContainer>
  );
};
