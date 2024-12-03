import React, { useState, useRef } from "react";
import { Box, OutlinedInput } from "@mui/material";

interface OTPInputProps {
  fields: number;
  handleChange: (value: string[]) => void;
  disabled?: boolean;
  error?: string;
  onBlur?: () => void;
}

const BACKSPACE_KEY = 8;
const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

const OTPInput: React.FC<OTPInputProps> = ({
  fields,
  disabled,
  handleChange,
  error,
  onBlur,
}) => {
  const [input, setInput] = useState<string[]>(Array(fields).fill(""));
  const inputRef = useRef({});

  const handleOTPUpdate = (value: string, index: number) => {
    const updatedValue = [...input];
    const regex = /^[0-9]$/;
    if (value === "" || regex.test(value)) {
      updatedValue[index] = value;
      setInput(updatedValue);
      handleChange(updatedValue);
      // set focus on next input field
      if (inputRef) {
        (inputRef as any).current[
          index < fields - 1 && value !== "" ? index + 1 : index
        ].focus();
      }
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEventHandler<HTMLDivElement> | any,
    index: number
  ) => {
    const nextTarget = (inputRef as any).current[index + 1];
    const prevTarget = (inputRef as any).current[index - 1];
    if (event.keyCode === BACKSPACE_KEY) {
      event.preventDefault();
      const updatedValue = [...input];
      updatedValue[index] = "";
      setInput(updatedValue);
      handleChange(updatedValue);
      if (prevTarget) {
        prevTarget.focus();
        prevTarget.select();
      }
    }
    if (event.keyCode === LEFT_ARROW_KEY) {
      event.preventDefault();
      if (prevTarget) {
        prevTarget.focus();
        prevTarget.select();
      }
    }
    if (event.keyCode === RIGHT_ARROW_KEY) {
      event.preventDefault();
      if (nextTarget) {
        nextTarget.focus();
        nextTarget.select();
      }
    }
  };

  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
        justifyContent={"center"}
        className="OtpInput"
      >
        {input.map((item, index) => (
          <OutlinedInput
            key={index}
            value={item}
            onChange={(e) => handleOTPUpdate(e.target.value, index)}
            // autoFocus={index === 0}
            inputRef={(element) => ((inputRef as any).current[index] = element)}
            onKeyDown={(
              event: React.KeyboardEventHandler<HTMLDivElement> | any
            ) => {
              handleKeyDown(event, index);
            }}
            onBlur={onBlur}
            inputProps={{
              maxLength: 1,
              style: { textAlign: "center" },
            }}
            error={Boolean(error)}
            disabled={disabled}
            autoComplete="off"
            classes={{
              notchedOutline: "fieldsetInput",
              input: "inputField",
              root: "inputRoot",
            }}
          />
        ))}
      </Box>
      {error && <span className="errorText lightError font-bold">{error}</span>}
    </>
  );
};

export default OTPInput;
