import styled from "styled-components";

export const NewCandidatesContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 30px;
`
export const NewCandidatesHeaderContainer = styled.div`
align-self: flex-start;
`
export const NewCandidatesBodyContainer = styled.div`
width: 90%;
`
export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 20px;
`
export const NewCandidatesBodyRow = styled.div`
display: flex;
align-items: center;
gap: 30px;
`
export const ButtonContainer = styled.div`
display: flex;
align-items: center;
width: 100%;
justify-content: center;
`
export const SelectedImageContainer = styled.div`
position: relative;
height: auto;
width: fit-content;
`
export const SelectedImage = styled.img`
width: 250px;
height: 250px;
object-fit: cover;
border-radius: 7px;
`
export const ImageUploadButtonContainer = styled.div`
display: flex;
align-items: center;
gap: 5px;
`
export const ImageUploadButton = styled.button`
`
export const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const WebcamContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`
export const DeleteImgButton = styled.div`
position: absolute;
top: 10px;
right: 10px;
background: #feeae9;
display: flex;
align-items: center;
justify-content: center;
padding: 5px;
border-radius: 4px;
cursor: pointer;
`