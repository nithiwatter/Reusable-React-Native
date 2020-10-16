import React, { Component } from "react";
import { ActivityIndicator } from "react-native";

import authManager from "../auth/authManager";
import { theme } from "../config";
import Screen from "../components/Screen";
import Block from "../components/Block";

export default class Loading extends Component {
  async componentDidMount() {
    const { setUser, setIsReady } = this.props;
    const { user } = await authManager.retrievePersistedAuthUser();

    // if there is a user, should be redirected to DrawerNavigator (main navigator)
    if (user) {
      setTimeout(() => {
        setUser(user);
        setIsReady(true);
      }, 1000);
    } else {
      setTimeout(() => {
        setIsReady(true);
      }, 1000);
    }
  }

  render() {
    return (
      <Screen>
        <Block middle center>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Block>
      </Screen>
    );
  }
}
