import React from "react";
// import {StyleSheet} from 'react-native'
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Avatar } from "react-native-paper";

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

  if (!user) return null;

  return (
    <DrawerContentScrollView {...props}>
      <Block flex={false} row center margin={[30, 0]}>
        <Block flex={false} middle center margin={[0, 15]}>
          {user.profilePictureURL !== "" ? (
            <Avatar.Image
              size={50}
              source={{
                uri: user.profilePictureURL,
              }}
            />
          ) : (
            <Avatar.Text
              size={50}
              label={user.email[0].toUpperCase()}
              style={{ backgroundColor: theme.colors.light }}
              labelStyle={{ color: theme.colors.gray }}
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
