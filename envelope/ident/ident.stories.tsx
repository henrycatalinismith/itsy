import { storiesOf } from "@storybook/react";
import React from "react";
import Ident from "./ident.component";

const stories = storiesOf("Ident", module);

stories.add("[default]", () => <Ident />);
