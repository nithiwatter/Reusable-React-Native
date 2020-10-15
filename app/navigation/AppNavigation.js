import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { theme } from "../config";
import Block from "../components/Block";
import Icon from "../components/Icon";

import Home from "../screens/Home";
import Search from "../screens/Search";
import Details from "../screens/Details";
import MyProfile from "../screens/MyProfile";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Register from "../screens/Register";

// logged in flow
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const MainTab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

// onboarding flow
const AuthenticationStack = createStackNavigator();

const MenuIcon = (props) => {
  const { navigation, ...otherProps } = props;
  return (
    <TouchableWithoutFeedback
      {...otherProps}
      onPress={() => navigation.openDrawer()}
    >
      <Block middle center flex={false} margin={[0, 15]}>
        <Icon name="menu" color={theme.colors.gray} size={25} />
      </Block>
    </TouchableWithoutFeedback>
  );
};

const BackIcon = (props) => {
  const { navigation, ...otherProps } = props;
  return (
    <TouchableWithoutFeedback
      {...otherProps}
      onPress={() => navigation.goBack()}
    >
      <Block middle center flex={false} margin={[0, 15]}>
        <Icon name="chevron-left" color={theme.colors.primary} size={40} />
      </Block>
    </TouchableWithoutFeedback>
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerLeft: (props) => <MenuIcon navigation={navigation} {...props} />,
      })}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Details" component={Details} />
    </HomeStack.Navigator>
  );
};

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerLeft: (props) => <MenuIcon navigation={navigation} {...props} />,
      })}
    >
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="Details" component={Details} />
    </SearchStack.Navigator>
  );
};

const AuthenticationStackNavigator = () => {
  return (
    <AuthenticationStack.Navigator initialRouteName="Welcome">
      <AuthenticationStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AuthenticationStack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerStyle: { elevation: 0 },
          headerTitle: "",
          headerLeft: (props) => (
            <BackIcon navigation={navigation} {...props} />
          ),
        })}
      />
      <AuthenticationStack.Screen
        name="Register"
        component={Register}
        options={({ navigation }) => ({
          headerStyle: { elevation: 0 },
          headerTitle: "",
          headerLeft: (props) => (
            <BackIcon navigation={navigation} {...props} />
          ),
        })}
      />
    </AuthenticationStack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      shifting
      initialRouteName="Home"
      activeColor={theme.colors.white}
    >
      <MainTab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarColor: theme.colors.primary,
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={25} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: "Search",
          tabBarColor: theme.colors.secondary,
          tabBarIcon: ({ color }) => (
            <Icon name="database-search" size={25} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={MainTabNavigator} />
      <Drawer.Screen name="MyProfile" component={MyProfile} />
    </Drawer.Navigator>
  );
};

export { DrawerNavigator, AuthenticationStackNavigator };
