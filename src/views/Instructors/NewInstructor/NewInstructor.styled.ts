import styled from "styled-components";

export const NewInstructorContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 30px;
`
export const NewInstructorHeaderContainer = styled.div`
align-self: flex-start;
`
export const NewInstructorBodyContainer = styled.div`
width: 90%;
`
export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 20px;
`
export const NewInstructorBodyRow = styled.div`
display: flex;
align-items: center;
gap: 30px;
`
export const PermissionGroupContainer = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
`
export const PermissionLabel = styled.div`
`
export const PermissionGroup = styled.div`
  /* flex: 1; */
  width: 200px;
  padding: 15px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  div {
    margin-bottom: 10px;
    color: #333;
    font-weight: bold;
  }

  label {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;

    input {
      margin-right: 10px;
    }
  }
`;

export const ButtonContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
justify-content: center;
`