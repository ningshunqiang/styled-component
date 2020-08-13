import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";

import Button from "../Button";
import Input from "../Input";

const Wrapper = styled.div`
  display: flex;
`;

const ApplyInput = styled.div`
  width: 70%;
`;

const ApplyButton = styled.div`
  width: 30%;
  margin-left: 12px;
`;

interface DiscountProps {
  value?: number | string | readonly string[];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Discount: FC<DiscountProps> = ({ value, onChange }) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (value) {
      if (value?.toString().length > 0) setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value, setDisabled]);

  return (
    <Wrapper>
      <ApplyInput>
        <Input placeholder="Discount code" value={value} onChange={onChange} />
      </ApplyInput>
      <ApplyButton>
        <Button size="large" disabled={disabled}>
          Apply
        </Button>
      </ApplyButton>
    </Wrapper>
  );
};

export default Discount;
