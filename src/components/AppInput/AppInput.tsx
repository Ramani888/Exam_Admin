import { Input, TextField } from "@mui/material";
import React from "react";
import {
  AppInputContainer,
  InputLabel,
  InputLabelAndErrorContainer,
  NoticeLabel,
  TextLabel,
  TextLabelSpan,
} from "./AppInput.styled";

interface Props {
  label: string;
  type: string;
  handleChange: (e: any) => void;
  name: string;
  value?: string;
  placeholder?: string;
  inputProps?: any;
  handleBlur: (e: any) => void;
  errors: any;
  touched: any;
  isUpdate?: boolean;
  minWidth?: string;
  isRequired?: boolean;
}

const AppInput: React.FC<Props> = ({ label, type, handleChange, name, value, placeholder, inputProps, handleBlur, errors, touched, isUpdate, minWidth, isRequired }) => {
  return (
    <AppInputContainer minWidth={minWidth}>
      <InputLabelAndErrorContainer>
        <TextLabel>{label} <TextLabelSpan>{isRequired ? '*' : ''}</TextLabelSpan></TextLabel>
        <div style={{ color: "red", fontStyle: "italic", fontSize: 12 }}>
          {errors[name] && touched[name] && errors[name]}
        </div>
      </InputLabelAndErrorContainer>
      <TextField
        id="outlined-password-input"
        placeholder={placeholder}
        name={name}
        type={type}
        onChange={handleChange}
        value={value}
        inputProps={inputProps}
        onBlur={handleBlur}
      />
      {isUpdate && (
        <NoticeLabel>("If you wish to alter the image, please select it.")</NoticeLabel>
      )}
    </AppInputContainer>
  );
};

export default AppInput;
