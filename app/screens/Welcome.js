import React from "react";

import { theme } from "../config";
import Screen from "../components/Screen";
import Block from "../components/Block";
import Typography from "../components/Typography";
import Button from "../components/Button";

export default function Welcome({ navigation }) {
  return (
    <Screen>
      <Block middle center padding={10}>
        <Typography h1 bold accent>
          Welcome Screen
        </Typography>
        <Typography h2 bold gray center>
          Here is some description for the welcome screen.
        </Typography>

        <Block flex={false} middle center width="80%" margin={[30, 0]}>
          <Button
            gradient
            width="100%"
            elevation={1}
            onPress={() => navigation.navigate("Login")}
          >
            <Typography h3 bold white>
              Login
            </Typography>
          </Button>
          <Button
            gradient
            width="100%"
            elevation={1}
            startColor={theme.colors.secondary}
            endColor={theme.colors.tertiary}
            onPress={() => navigation.navigate("Register")}
          >
            <Typography h3 bold white>
              Register
            </Typography>
          </Button>
        </Block>
      </Block>
    </Screen>
  );
}
