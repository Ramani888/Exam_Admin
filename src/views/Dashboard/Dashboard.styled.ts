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
display: flex;
align-items: center;
gap: 20px;
overflow-x: auto;
padding: 10px;
width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`
export const DashboardCategoryProductChart = styled.div`
background: #f5f5f6;
padding: 10px;
width: auto;
border-radius: 7px;
display: flex;
flex-direction: column;
gap: 10px;
width: 40%;
min-width: 400px;
`
export const DashboardCategoryProductChartTitle = styled.div`
color: #0b3157;
`
export const DashboardTopCustomerContainer = styled.div`
background: #f5f5f6;
padding: 10px;
width: 30%;
border-radius: 7px;
display: flex;
flex-direction: column;
gap: 10px;
min-width: 300px;
height: 400px;
`
export const DashboardTopCustomerTitle = styled.div`
font-weight: bold;
`
export const DashboardSalesChartContainer = styled.div`
background: #f5f5f6;
padding: 10px;
width: 100%;
border-radius: 7px;
display: flex;
flex-direction: column;
gap: 10px;
min-width: 600px;
`
export const DashboardSalesChartWrapper = styled.div`
display: flex;
align-items: center;
width: 100%;
gap: 10px;
overflow-x: auto;

&::-webkit-scrollbar {
    display: none;
  }
`
export const DashboardRowCustomer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background: #0b3157;
padding: 10px;
border-radius: 7px;
`
export const DashboardCustomerName = styled.div`
color: #ffffff;
`
export const DashboardCustomerRevenue = styled.div`
font-weight: bold;
background: #ffffff;
padding: 4px 8px 4px 8px;
border-radius: 7px;
color: #0b3157;
display: flex;
align-items: center;
`
export const DashboardTopCategoryContainer = styled.div`
background: #f5f5f6;
padding: 10px;
width: 30%;
border-radius: 7px;
display: flex;
flex-direction: column;
gap: 10px;
min-width: 300px;
height: 400px;
`
export const DashboardTopCategoryTitle = styled.div`
font-weight: bold;
`
export const DashboardRowCategory = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background: #0b3157;
padding: 10px;
border-radius: 7px;
`
export const DashboardCategoryName = styled.div`
color: #ffffff;
`
export const DashboardCategoryRevenue = styled.div`
font-weight: bold;
background: #ffffff;
padding: 4px 8px 4px 8px;
border-radius: 7px;
color: #0b3157;
display: flex;
align-items: center;
`
export const DashboardTopCategoryWrapper = styled.div`
padding: 10px;
display: flex;
flex-direction: column;
gap: 15px;
`
export const DashboardTopCustomerWrapper = styled.div`
padding: 10px;
display: flex;
flex-direction: column;
gap: 15px;
`