import React from 'react'
import { AppDropDownContainer, DropDownLabelAndErrorContainer, TextLabel, TextLabelSpan } from './AppMultiDropDown.styled'
import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';

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
  value: string[];
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

const AppMultiDropDown: React.FC<Props> = ({ data, handleChange, value, placeHolder, handleBlur, errors, name, touched, label, minWidth, valueByName, isRequired }) => {
  const getDisplayName = (selected: string[]) => {
    return selected
      .map(selectedValue => {
        const selectedItem = data.find(item => valueByName ? item.name === selectedValue : item._id === selectedValue);
        return selectedItem ? selectedItem.name : selectedValue;
      })
      .join(', ');
  };
  return (
    <AppDropDownContainer>
      <DropDownLabelAndErrorContainer>
        <TextLabel>{label} <TextLabelSpan>{isRequired ? '*' : ''}</TextLabelSpan></TextLabel>
        <div style={{color: 'red', fontStyle: 'italic', fontSize: 12}}>
          {errors[name] && touched[name] && errors[name]}
        </div>
      </DropDownLabelAndErrorContainer>
      <FormControl sx={{minWidth: minWidth ?? 'auto', maxWidth: 120}}>
        <Select
        multiple
          displayEmpty
          value={value}
          name={name}
          onChange={handleChange}
          input={<OutlinedInput />}
          onBlur={handleBlur}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          renderValue={(selected) => {
            if (selected.length === 0) {
                return <em>{placeHolder}</em>;
            }
            return getDisplayName(selected);
          }}
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

export default AppMultiDropDown