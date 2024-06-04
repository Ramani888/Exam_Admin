import React from 'react'
import { useExamCreation } from './useExamCreation';
import { ExamCreationContainer } from './ExamCreation.styled';
import {
  MaterialReactTable
} from 'material-react-table';

const ExamCreation = () => {
  const {
    table
  } = useExamCreation();
  return (
    <ExamCreationContainer>
      <MaterialReactTable table={table} />
    </ExamCreationContainer>
  )
}

export default ExamCreation