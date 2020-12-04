import React from "react";
import { Button as ButtonStory } from "./button";

export default {
  title: "Button",
  // component: SectionTitle
};
export const Button = args => <ButtonStory {...args} />;
Button.args = { children: "Button" };
