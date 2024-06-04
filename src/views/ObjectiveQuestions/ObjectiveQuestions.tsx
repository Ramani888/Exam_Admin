import React from 'react'
import { ObjectiveQuestionsContainer } from './ObjectiveQuestions.styled'
import {
  MaterialReactTable
} from 'material-react-table';
import useObjectiveQuestions from './useObjectiveQuestions';

const ObjectiveQuestions = () => {
  const {
    table
  } = useObjectiveQuestions();
  return (
    <ObjectiveQuestionsContainer>
      <MaterialReactTable table={table} />
    </ObjectiveQuestionsContainer>
  )
}

export default ObjectiveQuestions