import styled from "styled-components";
import { Stepper } from '@mui/material';

export const NewExamCreationContainer = styled.div`
display: flex;
flex-direction: column;
gap: 30px;
align-items: center;
`
export const NewExamCreationHeaderContainer = styled.div`
width: 100%;
color: #3a90da;
text-decoration: underline;
display: flex;
gap: 20px;
flex-direction: column;
`
export const NewExamCreationBodyContainer = styled.div`
width: 95%;
`
export const Form = styled.form`
`
export const AccordionRow = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap: 60px;
`
export const ButtonContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
justify-content: center;
gap: 20px;
margin-top: 40px;
margin-bottom: 20px;
`
export const NewExamCreationBodyWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
`
export const SubjectSelectionContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const SubjectSelectionHeaderContainer = styled.div`
font-weight: bold;
align-self: flex-start;
`
export const SubjectSelectionBodyContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
`
export const SubjectSelectionBodyRow = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 60px;
width: 100%;
margin-top: 30px;
margin-bottom: 30px;
`
export const ExamQuestionTableContainer = styled.div`
width: 100%;
margin-top: 30px;
margin-bottom: 30px;
`
export const PassingMarkContainer = styled.div`
width: 100%;
margin-top: 30px;
margin-bottom: 30px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 5px;
`
export const PassingMarkLabel = styled.div`
`
export const PassingMarkWrapper = styled.div`
display: flex;
align-items: center;
gap: 5px;
`
export const PassingMarkInput = styled.input`
width: 60px;
height: 20px;
`
export const TotalMark = styled.div`
font-size: 18px;
font-weight: bold;
`