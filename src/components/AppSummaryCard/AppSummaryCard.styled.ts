import { styled } from "styled-components";

export const AppSummaryCardContainer = styled.div`
width: auto;
max-width: 300px;
height: 100px;
background-color: #ffffff;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;border-radius: 7px;
display: flex;
align-items: center;
padding: 20px;
gap: 20px;
position: relative;
border: 1px solid #f2f8f9;
transition: border 0.5s linear, box-shadow 0.3s linear;
cursor: pointer;

    &:hover {
        border: 1px solid #1876d0;
    }
`
export const AppSummaryCardDetailContainer = styled.div`
`

export const AppSummaryCardIconContainer = styled.div`
width: 60px;
height: 60px;
background: #1876d1;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
`
export const AppSummaryCardTitle = styled.div`
font-size: 18px;
color: #0b3157;
white-space: nowrap;
`
export const AppSummaryCardCount = styled.div`
font-size: 18px;
font-weight: bold;
display: flex;
align-items: center;
color: #0b3157;
`

export const GoCorner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 32px;
  height: 32px;
  overflow: hidden;
  top: 0;
  right: 0;
  background-color: #1876d0;
  border-radius: 0 4px 0 32px;
`;

export const GoArrow = styled.div`
  margin-top: -4px;
  margin-right: -4px;
  color: white;
  font-family: courier, sans-serif;
`;
