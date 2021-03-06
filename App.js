import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import AuthContext from "./app/auth/context";
import {
  DrawerNavigator,
  AuthenticationStackNavigator,
} from "./app/navigation/AppNavigation";
import Loading from "./app/screens/Loading";

// need this to ignore timer warning
// internal issue with the firebase web sdk and react-native sockets
LogBox.ignoreLogs(["Setting a timer"]);

const RootStack = createStackNavigator();

// need this to prevent Hook from retaining local state (for debugging didMount animations)
// @refresh reset
export default function App() {
  const [user, setUser] = React.useState(null);
  const [isReady, setIsReady] = React.useState(false);
  // console.log("User state changed: ", user);

  if (!isReady) {
    return <Loading setUser={setUser} setIsReady={setIsReady} />;
  }

  return (
    <ActionSheetProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          <RootStack.Navigator headerMode="none">
            {user ? (
              <RootStack.Screen name="Main" component={DrawerNavigator} />
            ) : (
              <RootStack.Screen
                name="Auth"
                component={AuthenticationStackNavigator}
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ActionSheetProvider>
  );
}
