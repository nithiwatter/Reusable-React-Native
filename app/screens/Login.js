import React from "react";

import Screen from "../components/Screen";
import Block from "../components/Block";
import Typography from "../components/Typography";
import { Form, FormInput, SubmitButton } from "../components/form";

export default function Login() {
  return (
    <Screen>
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
              elevation={1}
            />
            <FormInput
              name="password"
              placeholder="Password"
              width="100%"
              margin={[20, 0, 0, 0]}
              elevation={1}
            />
            <Block middle center margin={[50, 0]} width="100%">
              <SubmitButton title="Login" width="100%" elevation={1} />
            </Block>
          </Form>
        </Block>
      </Block>
    </Screen>
  );
}
