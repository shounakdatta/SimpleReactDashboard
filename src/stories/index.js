import React from "react";
import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import Store from "./Store";
import AppContainer from "./AppContainer";
import { LoginScreen, HomeScreen, SignUpScreen } from "../pages";
import { PageWrapper } from "../components";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Login", module)
  .addDecorator(Store)
  .addDecorator(AppContainer)
  .add("Login Screen", () => <LoginScreen />)
  .add("Sign Up", () => <SignUpScreen />);

storiesOf("Home", module)
  .addDecorator(Store)
  .add("Page Wrapper", () => <PageWrapper />)
  .add("Home Screen", () => <HomeScreen />);
