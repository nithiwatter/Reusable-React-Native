import React from "react";

import authManager from "../auth/authManager";
import { theme } from "../config";
import Screen from "../components/Screen";
import Block from "../components/Block";
import Typography from "../components/Typography";
import Button from "../components/Button";
import { Form, FormInput, SubmitButton } from "../components/form";

export default function Login() {
  return (
    <Screen modal>
      <Block middle center>
        <Typography h1 bold accent>
          Login Screen
        </Typography>
        <Block flex={false} middle center width="80%" margin={[30, 0]}>
          <Form initialValues={{ email: "", password: "" }}>
            <FormInput
              name="email"
              placeholder="Email"
              width="100%"
              margin={[20, 0, 0, 0]}
              style={{ borderWidth: 2, borderColor: theme.colors.light }}
            />
            <FormInput
              name="password"
              placeholder="Password"
              width="100%"
              margin={[20, 0, 0, 0]}
              style={{ borderWidth: 2, borderColor: theme.colors.light }}
            />
            <Block
              flex={false}
              middle
              center
              margin={[20, 0, 0, 0]}
              width="100%"
            >
              <SubmitButton title="Login" width="100%" />
            </Block>
          </Form>
          <Typography h2 gray>
            Or
          </Typography>
          <Button
            width="100%"
            style={{ borderWidth: 1, borderColor: theme.colors.primary }}
            onPress={authManager.signinWithGoogleAsync}
          >
            <Typography h3 primary bold>
              Google Login
            </Typography>
          </Button>
        </Block>
      </Block>
    </Screen>
  );
}
