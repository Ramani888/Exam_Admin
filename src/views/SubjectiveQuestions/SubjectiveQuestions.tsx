import React from 'react'
import { SubjectiveQuestionsContainer } from './SubjectiveQuestions.styled'
import {
  MaterialReactTable
} from 'material-react-table';
import useSubjectiveQuestions from './useSubjectiveQuestions';

const SubjectiveQuestions = () => {
  const {
    table
  } = useSubjectiveQuestions();
  return (
    <SubjectiveQuestionsContainer>
      <MaterialReactTable table={table} />
    </SubjectiveQuestionsContainer>
  )
}

export default SubjectiveQuestions