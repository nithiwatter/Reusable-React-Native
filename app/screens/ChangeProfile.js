import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import AuthContext from "../auth/context";
import { theme } from "../config";
import Screen from "../components/Screen";
import Block from "../components/Block";
import Typography from "../components/Typography";
import { Form, FormInput } from "../components/form";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

export default function ChangeProfile() {
  const { user } = React.useContext(AuthContext);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <Screen modal>
      <Block center>
        <Block
          flex={false}
          row
          center
          width="100%"
          margin={[20, 0, 0, 0]}
          padding={15}
        >
          <Typography h3 gray>
            PUBLIC PROFILE
          </Typography>
        </Block>

        <Block
          flex={false}
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: theme.colors.light,
          }}
          width="100%"
        >
          <Form
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              phone: user.phone,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Block flex={false} row space="between" center>
              <Block flex={false} row middle center padding={[0, 0, 0, 15]}>
                <Typography h3 gray>
                  First Name
                </Typography>
              </Block>

              <FormInput
                name="firstName"
                placeholder="First Name"
                style={styles.inputContainer}
                inputStyle={styles.input}
              />
            </Block>

            <Block flex={false} row space="between" center>
              <Block flex={false} row middle center padding={[0, 0, 0, 15]}>
                <Typography h3 gray>
                  Last Name
                </Typography>
              </Block>

              <FormInput
                name="lastName"
                placeholder="Last Name"
                style={styles.inputContainer}
                inputStyle={styles.input}
              />
            </Block>

            <Block flex={false} row space="between" center>
              <Block flex={false} row middle center padding={[0, 0, 0, 15]}>
                <Typography h3 gray>
                  Phone Number
                </Typography>
              </Block>

              <FormInput
                name="phone"
                placeholder="Phone Number"
                style={styles.inputContainer}
                inputStyle={styles.input}
                keyboardType="number-pad"
              />
            </Block>
          </Form>
        </Block>
      </Block>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    // for handling user typing very long input
    // need to find way to handle this
    overflow: "hidden",
    borderWidth: 0,
    borderRadius: 0,
  },
  input: {
    flex: 0,
    marginLeft: 0,
    textAlign: "right",
  },
});
