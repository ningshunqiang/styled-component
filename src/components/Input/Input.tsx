import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  KeyboardEventHandler,
  ReactNode,
  useCallback,
} from "react";
import styled, { css } from "styled-components";

interface InputStyleProps extends Omit<InputProps, "error"> {
  error: string;
}

const InputStyle = styled.input<InputStyleProps>`
  display: block;

  box-sizing: border-box;
  width: 100%;
  padding: 0.9285714286em 0.7857142857em;

  ${(props) => {
    return (
      typeof props.value === "string" &&
      css`
        padding-top: 1.5em;
        padding-bottom: 0.3571428571em;
      `
    );
  }}

  word-break: normal;

  color: #333;
  border: 1px transparent solid;
  border-color: #d9d9d9;
  border-radius: 5px;
  background-color: white;
  background-clip: padding-box;

  line-height: inherit;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    border-color: #a26b25;
    outline: none;
    box-shadow: 0 0 0 1px #a26b25;
  }

  ${(props) => {
    return (
      props.error === "true" &&
      css`
        border-color: #e32c2b;
        outline: none;
        box-shadow: 0 0 0 1px #e32c2b;
      `
    );
  }}
`;

const LabelStyle = styled.label<Pick<InputProps, "value">>`
  position: absolute;
  z-index: 1;

  top: -2px;

  width: 100%;
  margin-top: 0.4285714286em;
  margin-left: 1px;
  padding: 0 0.9166666667em;

  opacity: 1;
  color: #737373;

  font-size: 12px;
  font-weight: normal;
`;

const Wrapper = styled.div`
  position: relative;
`;

const ErrorStyle = styled.div`
  margin: 0.5714285714em 0 0.2857142857em;

  color: #e32c2b;

  font-size: 12px;
  line-height: 1.3em;
`;

interface InputProps {
  helpText?: ReactNode; // 错误后的提示文本
  error?: boolean; // 是否内容错误
  placeholder?: string; // 提示文本 （提示文本若是没有的话就用标签）
  label?: string; // 标签
  value?: number | string | readonly string[]; //
  type?: string; // 类型
  onPressEnter?: KeyboardEventHandler<HTMLInputElement>; // 按回车键
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // 值发生改变
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void; // 失去焦点时判断值是否符合规范
}

const Input: FC<InputProps> = ({
  helpText,
  error = false,
  placeholder,
  label,
  value,
  type,
  onPressEnter,
  onChange,
  onBlur,
}) => {
  const handelKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (onPressEnter && event.keyCode === 13) {
        return onPressEnter(event);
      }
    },
    [onPressEnter]
  );

  return (
    <Wrapper>
      {!(typeof value === "undefined") && (
        <LabelStyle value={value}>{label || placeholder}</LabelStyle>
      )}
      <InputStyle
        placeholder={
          typeof value === "undefined" ? placeholder || label : undefined
        }
        value={value}
        type={type}
        onChange={onChange}
        onKeyDown={handelKeyDown}
        onBlur={onBlur}
        error={error.toString()}
      />
      {error && <ErrorStyle>{helpText}</ErrorStyle>}
    </Wrapper>
  );
};

export default Input;
