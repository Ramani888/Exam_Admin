import { styled } from "styled-components";

export const AppInputContainer = styled.div<{minWidth?: string}>`
display: flex;
flex-direction: column;
gap: 5px;
min-width: ${({ minWidth }) => minWidth ?? '300px'};
width: auto;
// height: 500px;
`
export const InputLabel = styled.label`
`
export const Input = styled.input`
border: 2px solid black;
// height: 30px
`
export const TextLabel = styled.label`
`
export const TextLabelSpan = styled.span`
color: red;
`
export const InputLabelAndErrorContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
export const NoticeLabel = styled.label`
position: relative;
  display: block;
  font-size: 14px;
  opacity: 0.5;

  /* &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background-color: black;
    border-radius: 50%;
  } */
`