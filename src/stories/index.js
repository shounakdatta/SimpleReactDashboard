import React from "react";
import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import Store from "./store";
import { LoginScreen, HomeScreen } from "../pages";
import { PageWrapper } from "../components";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Login", module)
  .addDecorator(Store)
  .add("Login Screen", () => <LoginScreen />);

storiesOf("Home", module)
  .addDecorator(Store)
  .add("Page Wrapper", () => <PageWrapper />)
  .add("Home Screen", () => <HomeScreen />);
