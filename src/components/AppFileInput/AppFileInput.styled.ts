import { styled } from "styled-components";

export const AppFileInputContainer = styled.div`
`
export const AppFileInputBoxContainer = styled.div<{isValue: boolean}>`
width: 300px;
height: 200px;
border-radius: 7px;
border: ${({ isValue }) => isValue ? '1px dotted black' : 'none'};
display: flex;
align-items: center;
justify-content: center;
`
export const AppFileInputBoxImage = styled.div`

`