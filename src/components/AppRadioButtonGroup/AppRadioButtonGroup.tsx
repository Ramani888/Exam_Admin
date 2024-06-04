import React, { useEffect, useState } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface Props {
    label: string;
    name: string;
    value: boolean;
    handleRadioChange: (e: any) => void;
}

const AppRadioButtonGroup: React.FC<Props> = ({label, handleRadioChange, name, value}) => {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name={name}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRadioChange({
                    target: {
                        name: e.target.name,
                        value: e.target.value === 'true'
                    }
                })}            
            >
                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
        </FormControl>
    )
}

export default AppRadioButtonGroup