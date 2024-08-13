import styled from "styled-components";

export const NewBatchContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 30px;
`
export const NewBatchHeaderContainer = styled.div`
align-self: flex-start;
`
export const NewBatchBodyContainer = styled.div`
width: 90%;
`
export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 20px;
`
export const NewBatchBodyRow = styled.div`
display: flex;
align-items: center;
gap: 30px;
`
export const ButtonContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
justify-content: flex-start;
`
export const StudentListContainer = styled.div`
width: 100%;
`
export const StudentListHeaderContainer = styled.div`
width: 100%;
height: 50px;
background-color: whitesmoke;
padding: 20px;
display: flex;
align-items: center;
justify-content: space-between;
`
export const StudentListBodyContainer = styled.div`
width: 100%;
height: 150px;
overflow: auto;
`
export const SelectedStudentCount = styled.div`
`
export const Tr = styled.tr`
height: 30px;
border: 1px solid black;
border-collapse: collapse;
`
export const Td = styled.td`
min-width: 20px;
`