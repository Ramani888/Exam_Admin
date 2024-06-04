import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react'
import { AppDropDownContainer, DropDownLabelAndErrorContainer, TextLabel, TextLabelSpan } from './AppDropDown.styled';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  data: any[];
  handleChange: (e: any) => void;
  value: any;
  placeHolder: string;
  handleBlur?: (e: any) => void;
  errors?: any;
  name: string;
  touched?: any;
  label: string;
  minWidth?: string;
  valueByName?: boolean;
  isRequired?: boolean;
}

const AppDropDown: React.FC<Props> = ({ data, handleChange, value, placeHolder, handleBlur, errors, name, touched, label, minWidth, valueByName, isRequired }) => {
  return (
    <AppDropDownContainer>
      <DropDownLabelAndErrorContainer>
        <TextLabel>{label} <TextLabelSpan>{isRequired ? '*' : ''}</TextLabelSpan></TextLabel>
        <div style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>
          {errors[name] && touched[name] && errors[name]}
        </div>
      </DropDownLabelAndErrorContainer>
      <FormControl sx={{minWidth: minWidth ?? 'auto'}}>
        <Select
          displayEmpty
          value={value}
          name={name}
          onChange={handleChange}
          input={<OutlinedInput />}
          onBlur={handleBlur}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            <em>{placeHolder}</em>
          </MenuItem>
          {data?.map((item, index) => (
            <MenuItem
              key={index}
              value={valueByName ? item?.name : item?._id}
            >
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </AppDropDownContainer>
  )
}

export default AppDropDown