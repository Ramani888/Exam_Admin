import styled from "styled-components";
import { Box, Button, CircularProgress, TextField, Radio, IconButton } from '@mui/material';

export const AddObjectiveQuestionsContainer = styled.div`
display: flex;
flex-direction: column;
gap: 30px;
align-items: center;
`
export const AddObjectiveQuestionsHeaderContainer = styled.div`
width: 100%;
color: #3a90da;
text-decoration: underline;
`
export const AddObjectiveQuestionsBodyContainer = styled.div`
width: 60%;
`
export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 20px;
`
export const SubjectTopicTypeContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
grid-gap: 20px;
`
export const ButtonContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
justify-content: center;
`
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #f5f5f5;
`;

export const HeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

export const TableRow = styled.tr`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`;

export const OptionCell = styled.td`
  flex: 1;
  padding: 0 10px;
`;




export const Container = styled('div')`
  margin: 20px;
`;

export const Row = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const TitleField = styled(TextField)`
  flex: 1;
  margin-right: 10px;
`;

export const AddButton = styled(Button)`
  margin-left: 10px;
`;
