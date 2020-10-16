import React from "react";
// import {StyleSheet} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar } from "react-native-elements";

import AuthContext from "../auth/context";
import authManager from "../auth/authManager";
import { theme } from "../config";
import Block from "../components/Block";
import Typography from "../components/Typography";
import Icon from "../components/Icon";

export default function CustomDrawerContent(props) {
  const { user, setUser } = React.useContext(AuthContext);

  const handleLogout = async () => {
    await authManager.logout();
    setUser(null);
  };

  return (
    <DrawerContentScrollView {...props}>
      <Block flex={false} row center margin={[30, 0]}>
        <Block flex={false} middle center margin={[0, 15]}>
          {user.profilePictureURL !== "" ? (
            <Avatar
              rounded
              source={{
                uri: user.profilePictureURL,
              }}
              size={50}
              activeOpacity={0.7}
            />
          ) : (
            <Avatar
              rounded
              title={user.email[0].toUpperCase()}
              size={50}
              activeOpacity={0.7}
              overlayContainerStyle={{ backgroundColor: theme.colors.light }}
              titleStyle={{ color: theme.colors.gray }}
            />
          )}
        </Block>

        <Block flex={false}>
          <Typography h3 bold>
            {user.email}
          </Typography>
          <Typography caption>Welcome to this template app!</Typography>
        </Block>
      </Block>
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => (
          <Typography h2 bold>
            Logout
          </Typography>
        )}
        icon={({ color, size }) => (
          <Icon name="logout" color={color} size={size} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}
