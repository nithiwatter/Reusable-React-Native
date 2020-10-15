import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerNavigator,
  AuthenticationStackNavigator,
} from "./app/navigation/AppNavigation";

export default function App() {
  const [user, _] = React.useState(false);

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthenticationStackNavigator />}
    </NavigationContainer>
  );
}
