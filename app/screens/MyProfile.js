import React from "react";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../auth/context";
import authManager from "../auth/authManager";

import { theme } from "../config";
import Screen from "../components/Screen";
import Block from "../components/Block";
import Typography from "../components/Typography";
import Button from "../components/Button";
import AccountImageInput from "../components/imagePicker/AccountImageInput";
import AccountListItemView from "../components/list/account/AccountListItemView";

const menuItems = [
  {
    title: "Change Profile",
    icon: "face-profile",
    color: theme.colors.accent,
    navigate: "ChangeProfile",
  },
  {
    title: "Settings",
    icon: "settings",
    color: theme.colors.gray2,
    navigate: "Settings",
  },
  {
    title: "Contact us",
    icon: "phone",
    color: theme.colors.primary,
    navigate: "ContactUs",
  },
];

export default function MyProfile() {
  const navigation = useNavigation();
  const { user, setUser } = React.useContext(AuthContext);
  const startingImage =
    user.profilePictureURL === "" ? null : user.profilePictureURL;
  const [image, setImage] = React.useState(startingImage);

  const handleLogout = async () => {
    await authManager.logout();
    setUser(null);
  };

  return (
    <Screen modal>
      <Block center>
        <Block flex={false} middle center margin={[20, 0]}>
          <AccountImageInput image={image} setImage={setImage} size={100} />
        </Block>

        <Block flex={false} middle center>
          <Typography h2 light>
            {user.email}
          </Typography>
        </Block>

        <Block flex={false} middle center width="100%" margin={[20, 0]}>
          {menuItems.map((item) => (
            <AccountListItemView
              key={item.title}
              title={item.title}
              icon={item.icon}
              color={item.color}
              onPress={() => navigation.navigate(item.navigate)}
            />
          ))}
        </Block>
        <Block flex={false} middle center padding={[0, 20]} width="100%">
          <Button
            onPress={handleLogout}
            style={{
              width: "100%",
              borderWidth: 2,
              borderColor: theme.colors.light,
            }}
          >
            <Typography title>Logout</Typography>
          </Button>
        </Block>
      </Block>
    </Screen>
  );
}
