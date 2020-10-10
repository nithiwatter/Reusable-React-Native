import React from "react";
import { ScrollView } from "react-native";
import Block from "./app/components/Block";
import Typography from "./app/components/Typography";
import Icon from "./app/components/Icon";
import Card from "./app/components/Card";
import Divider from "./app/components/Divider";
import Screen from "./app/components/Screen";
import Button from "./app/components/Button";
import Picker from "./app/components/Picker";
import IconPickerItem from "./app/components/IconPickerItem";
import Input from "./app/components/Input";

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 69,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 79,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 89,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 99,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 997,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 995,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 993,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 998,
  },
];

export default function App() {
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <Screen color="gray2">
      <ScrollView>
        <Block
          flex={false}
          row
          middle
          center
          space="around"
          color="gray2"
          width="100%"
          wrap
        >
          <Block flex={false} middle center>
            <Icon
              name="trash-can"
              size={80}
              iconSize={40}
              elevation={3}
              borderWidth={4}
              borderColor="secondary"
              color="primary"
            ></Icon>
            <Typography h3 white>
              Hello
            </Typography>
          </Block>
          <Icon
            name="trophy"
            size={80}
            iconSize={40}
            elevation={0}
            borderWidth={4}
            borderColor="secondary"
            color="primary"
            square
          ></Icon>
          <Icon
            name="trophy"
            size={80}
            iconSize={40}
            elevation={0}
            borderWidth={4}
            borderColor="secondary"
            color="primary"
          ></Icon>
        </Block>
        <Card flex={false} margin={[4, 0]} center width="80%">
          <Icon
            name="trophy"
            size={80}
            iconSize={40}
            elevation={0}
            borderWidth={4}
            borderColor="secondary"
            color="tertiary"
          ></Icon>
          <Typography h3 black>
            Hello
          </Typography>
          <Divider color="black" thickness={5} width="100%"></Divider>
          <Divider color="black" thickness={4} vertical height={60}></Divider>
          <Block flex={false} row color="gray2" width="100%" middle center>
            <Divider color="black" thickness={2} vertical height={60}></Divider>
            <Icon
              name="trophy"
              size={80}
              iconSize={40}
              elevation={0}
              borderWidth={4}
              borderColor="secondary"
              color="primary"
            ></Icon>
          </Block>
          <Button gradient width="80%">
            <Typography h3 white bold>
              Hello
            </Typography>
          </Button>
        </Card>
        <Picker
          numberOfColumns={3}
          items={categories}
          placeholder="Select your category"
          selectedItem={selectedItem}
          icon="menu"
          onSelectItem={setSelectedItem}
          PickerItemComponent={IconPickerItem}
        ></Picker>
        <Input
          width="100%"
          placeholder="hi there"
          icon="menu"
          margin={[10, 0]}
        ></Input>
      </ScrollView>
    </Screen>
  );
}
