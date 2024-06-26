import { styled } from "styled-components";

export const LoginWrapper = styled.div`
height: 100vh;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
export const LoginContainer = styled.div`
height: calc(100vh - 150px);
width: 70%;
background-color: #ffffff;
box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
margin: 20px 0px 20px 0px;
display: flex;
align-items: center;
`
export const LoginLeftContainer = styled.div`
/* background-color: red; */
height: 100%;
width: 50%;
display: flex;
flex-direction: column;
justify-content: center;
gap: 40px;
`
export const LoginRightContainer = styled.div`
height: 100%;
width: 50%;
`
export const LoginHeaderContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 5px;
padding: 0px 60px 0px 60px;
`
export const HeaderLogo = styled.img`
height: 100px;
width: 100px;
margin-bottom: 10px;
`
export const HeaderWelcomeTitle = styled.div`
color: #7a879c;
font-size: 22px;
`
export const HeaderProjectName = styled.div`
color: #0b3157;
font-size: 45px;
font-weight: bold;
font-family: emoji;
`
export const LoginBodyContainer = styled.div`
padding: 0px 60px 60px 60px;
`
export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 20px;
`
export const RightBoxImg = styled.img`
`
export const LoginError = styled.div`
background: #f9e2df;
margin-top: 20px;
padding: 20px;
`