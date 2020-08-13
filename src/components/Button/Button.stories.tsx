import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import Button from ".";

const Wrapper = styled.div`
  margin: 100px;
`;

const stories = storiesOf("Button", module);

stories.add("默认", () => (
  <Wrapper>
    <Button>默认</Button>
  </Wrapper>
));

stories.add("大小", () => (
  <Wrapper>
    <Button size="large">large</Button>
    <div style={{ margin: "50px 0px" }}>
      <Button size="middle">middle</Button>
    </div>
    <Button size="small">small</Button>
  </Wrapper>
));

stories.add("禁用", () => (
  <Wrapper>
    <Button disabled>禁用</Button>
  </Wrapper>
));

stories.add("自适应", () => (
  <Wrapper>
    <Button adapter>自适应</Button>
  </Wrapper>
));

stories.add("加载中", () => (
  <Wrapper>
    <Button loading />
  </Wrapper>
));

stories.add("箭头", () => (
  <Wrapper>
    <Button size="large" arrow adapter />
  </Wrapper>
));
