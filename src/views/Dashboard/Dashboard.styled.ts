import { styled } from "styled-components";

export const DashboardContainer = styled.div`
height: auto;
width: 100%;
display: flex;
flex-direction: column;
gap: 10px;
overflow-x: auto;
overflow-y: auto;
`
export const DashboardSummaryCardContainer = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`