import React from "react";
import { ScrollView } from "react-native";
import rgba from "hex-to-rgba";

import { theme } from "../config";
import Block from "../components/Block";
import Badge from "../components/Badge";
import Card from "../components/Card";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import Typography from "../components/Typography";

const Icons = () => {
  return (
    <Block flex={false} row middle space="between" padding={20}>
      <Block flex={false} middle center>
        <Badge size={60} color="gray2">
          <Icon name="send" size={40}></Icon>
        </Badge>
        <Typography body bold>
          Send
        </Typography>
      </Block>
      <Block flex={false} middle center>
        <Badge size={60} color="gray2">
          <Icon name="refresh" size={40}></Icon>
        </Badge>
        <Typography body bold>
          Request
        </Typography>
      </Block>
      <Block flex={false} middle center>
        <Badge size={60} color="gray2">
          <Icon name="bank-transfer" size={40}></Icon>
        </Badge>
        <Typography body bold>
          Loan
        </Typography>
      </Block>
      <Block flex={false} middle center>
        <Badge size={60} color="gray2">
          <Icon name="hand-right" size={40}></Icon>
        </Badge>
        <Typography body bold>
          Topup
        </Typography>
      </Block>
    </Block>
  );
};

const RecentTransactions = () => {
  return (
    <Block flex={false}>
      <Typography h1 bold>
        Recent Transactions
      </Typography>
      <Block flex={false} row middle space="between" margin={10}>
        <Block
          card
          color="primary"
          row
          center
          space="between"
          padding={[4, 8]}
          margin={4}
        >
          <Typography body white>
            All
          </Typography>
          <Badge size={25} color="secondary">
            <Icon name="all-inclusive" />
          </Badge>
        </Block>
        <Block
          card
          color="primary"
          row
          center
          space="between"
          padding={[4, 8]}
          margin={4}
        >
          <Typography body white>
            Income
          </Typography>
          <Badge size={25} color="secondary">
            <Icon name="plus" />
          </Badge>
        </Block>
        <Block
          card
          color="primary"
          row
          center
          space="between"
          padding={[4, 8]}
          margin={4}
        >
          <Typography body white>
            Expense
          </Typography>
          <Badge size={25} color="secondary">
            <Icon name="minus" />
          </Badge>
        </Block>
      </Block>
    </Block>
  );
};

const Today = () => {
  return (
    <Block flex={false}>
      <Typography h3 light gray>
        Today
      </Typography>
      <Block flex={false} margin={[10, 0]}>
        <Card width="100%" flex={false} elevation={2}>
          <Block flex={false} row middle center>
            <Icon name="plus" color="primary" size={35} />
            <Block row middle center>
              <Block margin={[0, 15]}>
                <Typography body bold primary>
                  Food
                </Typography>
                <Typography body gray>
                  Payment for goods
                </Typography>
              </Block>
              <Typography body bold secondary>
                -$15
              </Typography>
            </Block>
          </Block>
        </Card>
        <Card width="100%" flex={false} elevation={2}>
          <Block flex={false} row middle center>
            <Icon name="plus" color="primary" size={35} />
            <Block row middle center>
              <Block margin={[0, 15]}>
                <Typography body bold primary>
                  Food
                </Typography>
                <Typography body gray>
                  Payment for goods
                </Typography>
              </Block>
              <Typography body bold secondary>
                -$15
              </Typography>
            </Block>
          </Block>
        </Card>
        <Card width="100%" flex={false} elevation={2}>
          <Block flex={false} row middle center>
            <Icon name="plus" color="primary" size={35} />
            <Block row middle center>
              <Block margin={[0, 15]}>
                <Typography body bold primary>
                  Food
                </Typography>
                <Typography body gray>
                  Payment for goods
                </Typography>
              </Block>
              <Typography body bold secondary>
                -$15
              </Typography>
            </Block>
          </Block>
        </Card>
      </Block>
    </Block>
  );
};

export default function Home() {
  return (
    <Screen>
      <ScrollView>
        <Block color={rgba(theme.colors.primary, 0.2)}>
          <Card height={170} color="primary" margin={[20, 10]}></Card>

          <Block
            color="light"
            padding={15}
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
          >
            <Icons></Icons>
            <RecentTransactions></RecentTransactions>
            <Today></Today>
            <Today></Today>
          </Block>
        </Block>
      </ScrollView>
    </Screen>
  );
}
