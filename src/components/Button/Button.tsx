import React, { FC } from "react";
import styled, { css, keyframes } from "styled-components";

const rotate = keyframes`
    from {
    transform: rotateZ(0deg);
        }
        to {
            transform: rotateZ(360deg);
        }
`;

const useSize = (size: string) => {
  const sizeInfo = {
    large: {
      height: "40px",
      padding: "6.4px 15px",
      fontSize: "16px",
    },
    middle: {
      height: "32px",
      padding: "4px 15px",
      fontSize: "14px",
    },
    small: {
      height: "24px",
      padding: "0 7px",
      fontSize: "14px",
    },
  };

  if (size === "large") return sizeInfo.large;
  if (size === "middle") return sizeInfo.middle;
  if (size === "small") return sizeInfo.small;
};

interface ButtonStyleProps extends Omit<ButtonProps, "loading" | "adapter"> {
  loading: string;
  adapter: string;
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  color: ${(props) => props.color};

  border: 1px transparent solid;
  border-radius: 5px;

  font-weight: 500;

  ${(props) => {
    return (
      props.backgroundColor &&
      css`
        background: ${props.disabled ? "#c8c8c8" : props.backgroundColor};
      `
    );
  }}  
    
   /* 鼠标悬停 */
  ${(props) => {
    return (
      props.backgroundHoverColor &&
      css`
        &:hover {
          background: ${props.backgroundHoverColor};
        }
      `
    );
  }}  

   /* 按钮大小 */
  ${(props) => {
    if (typeof props.size === "undefined") return;

    const sizeInfo = useSize(props.size);

    return (
      props.size &&
      css`
        height: ${sizeInfo?.height};
        padding: ${sizeInfo?.padding};

        font-size: ${sizeInfo?.fontSize};
      `
    );
  }}  

   /* 自适应 */
  ${(props) =>
    props.adapter === "true" &&
    css`
      @media (max-width: 749px) {
        width: 100%;
      }
    `}
      
   /* 加载中 */
  ${(props) => {
    return (
      props.loading === "true" &&
      css`
        cursor: pointer;
        pointer-events: none;

        opacity: 0.5;
        &::before {
          display: inline-block;

          width: 1em;
          height: 1em;

          content: "";
          animation: ${rotate} 1s linear infinite;
          vertical-align: -10%;

          color: white;
          border: 1px solid white;
          border-radius: 50%;
          clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 30%);
        }
      `
    );
  }}  
     
`;

interface ButtonProps {
  color?: string; // 默认 #fff
  backgroundColor?: string; // 默认 black
  backgroundHoverColor?: string; // 默认 black
  loading?: boolean | undefined; // 默认 false
  disabled?: boolean; // 默认 false
  size?: "small" | "middle" | "large"; // 默认 middle
  adapter?: boolean; // 是否适配屏幕大小 默认适配
  arrow?: boolean; // 是否显示按钮箭头 默认不显示
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: FC<ButtonProps> = ({
  color = "#fff",
  backgroundColor = "black",
  backgroundHoverColor,
  loading = false,
  disabled = false,
  size = "middle",
  adapter = false,
  arrow = false,
  children,
  onClick,
}) => {
  const arrowSvg = (
    <svg viewBox="0 0 1024 1024" p-id="863" height="32">
      <path
        d="M653.248 727.296L608 682.048l149.024-149.056H192v-64h564.992L608 320l45.248-45.248 226.272 226.24z"
        p-id="864"
        fill="#e6e6e6"
      />
    </svg>
  );

  return (
    <ButtonStyle
      disabled={disabled}
      onClick={onClick}
      color={color}
      backgroundColor={backgroundColor}
      size={size}
      adapter={adapter.toString()}
      backgroundHoverColor={backgroundHoverColor}
      loading={loading.toString()}
    >
      {loading ? "" : arrow ? arrowSvg : children}
    </ButtonStyle>
  );
};
