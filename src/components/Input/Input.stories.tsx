import { storiesOf } from "@storybook/react";
import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

import Input from ".";

const Wrapper = styled.div`
  margin: 100px;
`;

const stories = storiesOf("Input", module);

stories.add("基本", () => {
  const [value, setValue] = useState<string>();

  const handlePressEnter = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // console.log(event);
    },
    []
  );

  const handleChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <Wrapper>
      <Input
        placeholder="请输入信息"
        value={value}
        label="信息 label"
        onChange={handleChangeValue}
        onPressEnter={handlePressEnter}
      />
    </Wrapper>
  );
});

stories.add("失焦错误提示", () => {
  const [value, setValue] = useState<string>("10");
  const [error, setError] = useState(true);

  useEffect(() => {
    if (value === "") {
      setError(false);
    }
  }, [value, setError]);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      // 判断是否 value 是否符合规则
      setError(true);
    },
    [setError]
  );

  const handleChangeValue = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      console.log(event);
      setValue(event.target.value);
    },
    [setValue]
  );

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="请输入信息"
        value={value}
        label="信息 label"
        error={error}
        helpText={<span>输入信息有误</span>}
        onChange={handleChangeValue}
        onBlur={handleBlur}
      />
    </Wrapper>
  );
});
