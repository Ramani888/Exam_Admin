import { styled } from "styled-components"

export const MainContainer = styled.div`
height: 100%;
width: 100%;
overflow-y: auto;
`
export const LogoutContainer = styled.div`
position: absolute;
bottom: 20px;
display: flex;
align-items: center;
gap: 20px;
padding-left: 20px;
padding-top: 10px;
padding-bottom: 10px;
/* left: 20px; */
cursor: pointer;
width: 100%;
`
export const LogoutTitle = styled.div`
font-family: "Roboto", "Helvetica", "Arial", sans-serif;
font-weight: 400;
font-size: 1rem;
line-height: 1.5;
letter-spacing: 0.00938em;
`