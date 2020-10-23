import React from "react";
import { useNavigation } from "@react-navigation/native";

import AuthContext from "../auth/context";
import authManager from "../auth/authManager";
import firebaseStorage from "../firebase/firebaseStorage";
import firebaseUtils from "../firebase/firebaseUtils";

import { theme } from "../config";
import LoadingIndicator from "../components/LoadingIndicator";
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
  const [loading, setLoading] = React.useState(false);
  let startingImage = null;
  if (user) {
    startingImage =
      user.profilePictureURL === "" ? null : user.profilePictureURL;
  }
  const [image, setImage] = React.useState(startingImage);

  // need to check user is null
  // react navigation keeps stack despite unmounting! (potentially a bug)
  if (!user) return null;

  const handleLogout = async () => {
    console.log("logging out");
    await authManager.logout();
    setUser(null);
  };

  const changeProfilePicture = async (imageURL) => {
    setLoading(true);
    let toBeDeleted = null;
    let newUser = { ...user };
    // the profile picture url could be "" (falsey)
    if (user.profilePictureURL) {
      const { url, error } = firebaseStorage.getRefToStoredFile(
        user.profilePictureURL
      );
      if (!error) toBeDeleted = url;
    }

    // user decides to delete the image
    if (!imageURL) {
      if (toBeDeleted) {
        //save storage by deleting the old file
        await firebaseStorage.deleteFile(toBeDeleted);
      }
      // update the profile picture url as ""
      await firebaseUtils.updateProfilePicture(user.userID, "");
      newUser.profilePictureURL = "";
      setLoading(false);
      setImage(null);
      setUser(newUser);
      return;
    }

    // first upload the image to firebase
    const { downloadURL, error } = await firebaseStorage.uploadImageAsync(
      imageURL
    );

    if (!error) {
      // update the user for this new URL from firebase storage
      await firebaseUtils.updateProfilePicture(user.userID, downloadURL);
      // update the cache

      if (toBeDeleted) {
        //save storage by deleting the old file
        await firebaseStorage.deleteFile(toBeDeleted);
      }
      // update the cache user
      newUser.profilePictureURL = downloadURL;
      setLoading(false);
      setImage(downloadURL);
      setUser(newUser);
    }
  };

  return (
    <Screen modal>
      {loading && <LoadingIndicator />}
      <Block center>
        <Block flex={false} middle center margin={[20, 0]}>
          <AccountImageInput
            image={image}
            setImage={changeProfilePicture}
            size={100}
          />
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
