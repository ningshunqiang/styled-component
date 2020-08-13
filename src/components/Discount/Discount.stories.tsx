import { storiesOf } from "@storybook/react";
import React, { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";

import Discount from ".";

const Wrapper = styled.div`
  margin: 100px;
`;

const stories = storiesOf("Discount", module);

stories.add("基本", () => {
  const [value, setValue] = useState<string>();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <Wrapper>
      <Discount value={value} onChange={handleChange} />
    </Wrapper>
  );
});
