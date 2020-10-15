import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import { theme } from "../config";
import Screen from "../components/Screen";
import Block from "../components/Block";
import Typography from "../components/Typography";
import Button from "../components/Button";
import AccountImageInput from "../components/imagePicker/AccountImageInput";
import { Form, FormInput, SubmitButton } from "../components/form";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(3).label("Password"),
  repeatedPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Entered passwords are not the same")
    .required("Password confirm is required"),
});

export default function Register() {
  return (
    <Screen modal>
      <ScrollView contentContainerStyle={styles.container}>
        <Block middle center>
          <Typography h1 bold accent>
            Create new account
          </Typography>
          <Block flex={false} middle center width="80%" margin={[30, 0]}>
            <AccountImageInput />
            <Form
              initialValues={{ email: "", password: "", repeatedPassword: "" }}
              validationSchema={validationSchema}
            >
              <FormInput
                name="email"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                width="100%"
                margin={[20, 0, 0, 0]}
                style={{ borderWidth: 2, borderColor: theme.colors.light }}
              />
              <FormInput
                name="password"
                placeholder="Password"
                secureTextEntry
                width="100%"
                margin={[20, 0, 0, 0]}
                style={{ borderWidth: 2, borderColor: theme.colors.light }}
              />
              <FormInput
                name="repeatedPassword"
                placeholder="Enter password again"
                secureTextEntry
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
                <SubmitButton title="Register" width="100%" />
              </Block>
            </Form>
            <Typography h2 gray>
              Or
            </Typography>
            <Button
              width="100%"
              style={{ borderWidth: 1, borderColor: theme.colors.primary }}
            >
              <Typography h3 primary bold>
                Google Login
              </Typography>
            </Button>
          </Block>
        </Block>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
