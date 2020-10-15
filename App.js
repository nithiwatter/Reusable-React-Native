import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import {
  DrawerNavigator,
  AuthenticationStackNavigator,
} from "./app/navigation/AppNavigation";
import Loading from "./app/screens/Loading";

// need this to prevent Hook from retaining local state (for debugging didMount animations)
// @refresh reset
export default function App() {
  const [user, setUser] = React.useState(null);
  const [isReady, setIsReady] = React.useState(false);
  console.log(user);

  if (!isReady) {
    return <Loading setUser={setUser} setIsReady={setIsReady} />;
  }

  return (
    <NavigationContainer>
      <AuthenticationStackNavigator />
    </NavigationContainer>
  );
}
