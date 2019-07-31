import React from "react";
import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import Store from "./store";
import { LoginScreen } from "../pages";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Login", module)
  .addDecorator(Store)
  .add("Login Screen", () => <LoginScreen />);
