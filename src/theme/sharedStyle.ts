import { Button } from "@mui/material";
// import { css } from "@emotion/css";
import styled from "@emotion/styled";

export const ButtonPrimary = styled(Button)`
  background: radial-gradient(
    100.63% 100.63% at 50% -0.63%,
    #f1a100 0%,
    #cf8702 100%
  ) !important;
  color: var(--white) !important;

  &:hover {
    background: radial-gradient(
      800.63% 800.63% at 50% -0.5%,
      #f1a100 0%,
      #cf8702 100%
    ) !important; // Remove quotes here
  }

  &.Mui-disabled {
    opacity: 0.5 !important;
  }
`;
