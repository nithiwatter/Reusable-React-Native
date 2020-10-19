import React from "react";
import AuthContext from "../auth/context";

import Screen from "../components/Screen";
import Block from "../components/Block";
import Typography from "../components/Typography";
import AccountImageInput from "../components/imagePicker/AccountImageInput";

export default function MyProfile() {
  const { user } = React.useContext(AuthContext);
  const startingImage =
    user.profilePictureURL === "" ? null : user.profilePictureURL;
  const [image, setImage] = React.useState(startingImage);

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
      </Block>
    </Screen>
  );
}
