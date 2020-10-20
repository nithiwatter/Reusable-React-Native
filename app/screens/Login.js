import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import authManager from "../auth/authManager";
import AuthContext from "../auth/context";
import { theme } from "../config";
import Screen from "../components/Screen";
import Block from "../components/Block";
import Typography from "../components/Typography";
import Button from "../components/Button";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  Form,
  FormInput,
  SubmitButton,
  ErrorMessage,
} from "../components/form";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

export default function Login() {
  const { setUser } = React.useContext(AuthContext);
  const [loginFailed, setLoginFailed] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLoginWithEmailAndPassword = async (values) => {
    const { email, password } = values;
    setLoading(true);
    const { user, error } = await authManager.loginWithEmailAndPassword(
      email,
      password
    );
    setLoading(false);
    if (error) {
      setLoginFailed(error);
    } else {
      setUser(user);
    }
  };

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    const userData = await authManager.signinWithGoogleAsync();
    setLoading(false);
    const { user } = userData;
    setUser(user);
  };

  return (
    <Screen modal>
      <ScrollView contentContainerStyle={styles.container}>
        {loading && <LoadingIndicator />}
        <Block middle center>
          <Typography h1 bold accent>
            Login Screen
          </Typography>
          <Block flex={false} middle center width="80%" margin={[30, 0]}>
            <Form
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleLoginWithEmailAndPassword}
            >
              <ErrorMessage error={loginFailed} visible={loginFailed !== ""} />
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
                <SubmitButton title="Login" width="100%" />
              </Block>
            </Form>
            <Typography h2 gray>
              Or
            </Typography>
            <Button
              width="100%"
              style={{ borderWidth: 1, borderColor: theme.colors.primary }}
              onPress={handleLoginWithGoogle}
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
