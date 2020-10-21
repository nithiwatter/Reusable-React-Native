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
import AccountImageInput from "../components/imagePicker/AccountImageInput";
import LoadingIndicator from "../components/LoadingIndicator";
import {
  Form,
  FormInput,
  SubmitButton,
  ErrorMessage,
} from "../components/form";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(3).label("Password"),
  repeatedPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Entered passwords are not the same")
    .required("Password confirm is required"),
});

export default function Register() {
  const { setUser } = React.useContext(AuthContext);
  const [registerFailed, setRegisterFailed] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async (values) => {
    // start showing loading indicator
    setLoading(true);
    // values from formik
    const { email, password } = values;
    const userData = await authManager.createAccountWithEmailAndPassword({
      email,
      password,
      photoURI: image,
    });
    // uploading profile picture and registering user into firebase firestore done
    setLoading(false);

    const { user, error } = userData;
    // set register error (error message sent from firebase)
    if (error) {
      setRegisterFailed(error);
    } else {
      setUser(user);
    }
  };

  return (
    <Screen modal>
      <ScrollView contentContainerStyle={styles.container}>
        {loading && <LoadingIndicator />}
        <Block middle center>
          <Typography h1 bold accent>
            Create new account
          </Typography>
          <Block flex={false} middle center width="80%" margin={[30, 0]}>
            <AccountImageInput image={image} setImage={setImage} />
            <Form
              initialValues={{ email: "", password: "", repeatedPassword: "" }}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              <ErrorMessage
                error={registerFailed}
                visible={registerFailed !== ""}
              />
              <FormInput
                name="email"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                width="100%"
                margin={[20, 0, 0, 0]}
                style={{ borderWidth: 2, borderColor: theme.colors.light }}
                enableError
              />
              <FormInput
                name="password"
                placeholder="Password"
                secureTextEntry
                width="100%"
                margin={[20, 0, 0, 0]}
                style={{ borderWidth: 2, borderColor: theme.colors.light }}
                enableError
              />
              <FormInput
                name="repeatedPassword"
                placeholder="Enter password again"
                secureTextEntry
                width="100%"
                margin={[20, 0, 0, 0]}
                style={{ borderWidth: 2, borderColor: theme.colors.light }}
                enableError
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
