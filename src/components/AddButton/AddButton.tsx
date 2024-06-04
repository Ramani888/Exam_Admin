import React from 'react'
import { AddButtonContainer } from './AddButton.styled';

interface Props {
    buttonLabel: string;
    onClick: () => void;
}

const AddButton: React.FC<Props> = ({ buttonLabel, onClick }) => {
  return (
    <AddButtonContainer onClick={() => onClick()}>
        {buttonLabel}
    </AddButtonContainer>
  )
}

export default AddButton