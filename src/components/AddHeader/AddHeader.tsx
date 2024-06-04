import React from 'react'
import { AddHeaderContainer, HeaderTitle } from './AddHeader.styled'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useNavigation } from 'react-router-dom';

interface Props {
    title: string;
    handleNavigate: () => void;
}

const AddHeader: React.FC<Props> = ({ title, handleNavigate }) => {
  return (
    <AddHeaderContainer onClick={() => handleNavigate()}>
        <KeyboardDoubleArrowLeftIcon />
        <HeaderTitle>{title}</HeaderTitle>
    </AddHeaderContainer>
  )
}

export default AddHeader